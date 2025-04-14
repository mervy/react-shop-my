import { useEffect, useState } from 'react';
import api from '../services/api';
import { PencilSquare, Trash, PlusCircle, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

const Dashboard = () => {
    // Estado para produtos
    const [products, setProducts] = useState([]);
    const [currentProductPage, setCurrentProductPage] = useState(1);
    const [totalProductPages, setTotalProductPages] = useState(1);
    const [productLoading, setProductLoading] = useState(true);

    // Estado para usuários
    const [users, setUsers] = useState([]);
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const [totalUserPages, setTotalUserPages] = useState(1);
    const [userLoading, setUserLoading] = useState(true);

    // Buscar produtos
    const fetchProducts = async () => {
        try {
            setProductLoading(true);
            const response = await api.get(`/api/products?page=${currentProductPage}`);
            setProducts(response.data.products || []);
            setTotalProductPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setProductLoading(false);
        }
    };

    // Buscar usuários (você precisará criar o endpoint no backend)
    const fetchUsers = async () => {
        try {
            setUserLoading(true);
            const response = await api.get(`/api/users?page=${currentUserPage}`);
            setUsers(response.data.users || []);
            setTotalUserPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchUsers();
    }, [currentProductPage, currentUserPage]);

    // Funções de paginação para produtos
    const handleNextProductPage = () => {
        if (currentProductPage < totalProductPages) {
            setCurrentProductPage(currentProductPage + 1);
        }
    };

    const handlePrevProductPage = () => {
        if (currentProductPage > 1) {
            setCurrentProductPage(currentProductPage - 1);
        }
    };

    // Funções de paginação para usuários
    const handleNextUserPage = () => {
        if (currentUserPage < totalUserPages) {
            setCurrentUserPage(currentUserPage + 1);
        }
    };

    const handlePrevUserPage = () => {
        if (currentUserPage > 1) {
            setCurrentUserPage(currentUserPage - 1);
        }
    };

    // Funções de edição/exclusão (implementar conforme necessidade)
    const handleEditProduct = (productId) => {
        console.log('Editar produto:', productId);
        // Implementar lógica de edição
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await api.delete(`/api/products/${productId}`);
                fetchProducts(); // Recarregar a lista
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
            }
        }
    };

    return (
        <section className="container py-4">
            <h1 className="mb-4">Dashboard Administrativo</h1>

            {/* Seção de Produtos */}
            <div className="card mb-5">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h2 className="h5 mb-0">Produtos Cadastrados</h2>
                    <button className="btn btn-sm btn-light">
                        <PlusCircle size={16} className="me-1" />
                        Adicionar Produto
                    </button>
                </div>
                <div className="card-body">
                    {productLoading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Preço</th>
                                            <th>Estoque</th>
                                            <th>Data Criação</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <tr key={product._id}>
                                                    <td>{product._id.substring(18, 24)}</td>
                                                    <td>{product.name}</td>
                                                    <td>R$ {product.price.toFixed(2)}</td>
                                                    <td>{product.stock}</td>
                                                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={() => handleEditProduct(product._id)}
                                                        >
                                                            <PencilSquare size={14} />
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteProduct(product._id)}
                                                        >
                                                            <Trash size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    Nenhum produto encontrado
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginação de Produtos */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        onClick={handlePrevProductPage}
                                        disabled={currentProductPage === 1}
                                    >
                                        <ChevronLeft size={16} /> Anterior
                                    </button>
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={handleNextProductPage}
                                        disabled={currentProductPage === totalProductPages}
                                    >
                                        Próxima <ChevronRight size={16} />
                                    </button>
                                </div>
                                <span className="text-muted">
                                    Página {currentProductPage} de {totalProductPages}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Seção de Usuários */}
            <div className="card">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h2 className="h5 mb-0">Usuários Cadastrados</h2>
                    <button className="btn btn-sm btn-light">
                        <PlusCircle size={16} className="me-1" />
                        Adicionar Usuário
                    </button>
                </div>
                <div className="card-body">
                    {userLoading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Tipo</th>
                                            <th>Data Criação</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{user._id.substring(18, 24)}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                user.role === 'admin' ? 'bg-danger' : 'bg-primary'
                                                            }`}
                                                        >
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2">
                                                            <PencilSquare size={14} />
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            <Trash size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    Nenhum usuário encontrado
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginação de Usuários */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <button
                                        className="btn btn-outline-success btn-sm me-2"
                                        onClick={handlePrevUserPage}
                                        disabled={currentUserPage === 1}
                                    >
                                        <ChevronLeft size={16} /> Anterior
                                    </button>
                                    <button
                                        className="btn btn-outline-success btn-sm"
                                        onClick={handleNextUserPage}
                                        disabled={currentUserPage === totalUserPages}
                                    >
                                        Próxima <ChevronRight size={16} />
                                    </button>
                                </div>
                                <span className="text-muted">
                                    Página {currentUserPage} de {totalUserPages}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
