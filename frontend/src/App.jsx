import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import { CartProvider } from './contexts/CartContext'; // Provedor de carrinho

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Corrigido: <Home /> ao invés de Home */}
          <Route path="/cart" element={<Cart />} /> {/* Corrigido: <Cart /> ao invés de Cart */}
          <Route path="/checkout" element={<Checkout />} /> {/* Corrigido: <Checkout /> ao invés de Checkout */}
          <Route path="/login" element={<Login />} /> {/* Rota de login adicionada */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
