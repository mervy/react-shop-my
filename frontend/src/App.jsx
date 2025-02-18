import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Home from './components/Home';
import { CartProvider } from './contexts/CartContext'; // Provedor de carrinho

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Corrigido: <Home /> ao invés de Home */}
          <Route path="/cart" element={<Cart />} /> {/* Corrigido: <Cart /> ao invés de Cart */}
          <Route path="/checkout" element={<Checkout />} /> {/* Corrigido: <Checkout /> ao invés de Checkout */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
