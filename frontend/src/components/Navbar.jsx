// Navbar.jsx
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importando o ícone de carrinho
import { useCart } from '../contexts/CartContext'; // Para pegar o número de itens no carrinho

const Navbar = () => {
  const { totalItems } = useCart(); // Obtendo o número de itens no carrinho

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Store</Link>
        <div className="d-flex">
          {/* Link para a página do carrinho, com o ícone e o número de itens */}
          <Link to="/cart" className="btn btn-outline-success">
            <FaShoppingCart /> 
            {totalItems > 0 && <span className="badge bg-danger ms-2">{totalItems}</span>} {/* Mostra o número de itens no carrinho */}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
