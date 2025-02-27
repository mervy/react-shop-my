import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from './ProductCard';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../contexts/CartContext';  // Importando o hook do carrinho

const Home = () => {
    const { addToCart } = useCart();  // Pegando a função addToCart do contexto do carrinho
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            console.log('Modo atual:', import.meta.env.MODE);
            console.log('API usada:', import.meta.env.VITE_API_URL);
            try {
                setLoading(true);
                const response = await api.get(`/api/products`);
                if (isMounted) {
                    setProducts(response.data.products || []);
                    setTotalPages(response.data.totalPages);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError('Erro ao buscar produtos: ' + error.message);
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => { isMounted = false; };
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Header />            
            <section className="container">
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            addToCart={addToCart}  // Passando a função para adicionar ao carrinho
                        />
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>

            {/* Navegação de páginas */}
            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>{`Página ${currentPage} de ${totalPages}`}</span>
                <button
                    className="btn btn-secondary"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
