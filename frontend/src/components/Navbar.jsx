import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUser, FaStore } from 'react-icons/fa'; // Importando ícones
import { useCart } from '../contexts/CartContext'; // Para pegar o número de itens no carrinho

const Navbar = () => {
  const { totalItems } = useCart(); // Obtendo o número de itens no carrinho

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FaHome className="me-2" /> Home
        </Link>
        <Link className="navbar-brand" to="/register">
          <FaStore className="me-2" /> Register
        </Link>
        <Link className="navbar-brand" to="/login">
          <FaUser className="me-2" /> Login
        </Link>
        <div className="d-flex">
          {/* Link para a página do carrinho, com o ícone e o número de itens */}
          <Link to="/cart" className="btn btn-outline-success">
            <FaShoppingCart className="me-2" /> Carrinho
            {totalItems > 0 && <span className="badge bg-danger ms-2">{totalItems}</span>} {/* Mostra o número de itens no carrinho */}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
