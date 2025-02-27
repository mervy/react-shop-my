import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Teste from './components/Teste';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import { CartProvider } from './contexts/CartContext'; // Provedor de carrinho

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar /> {/* Agora a Navbar está dentro do Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teste" element={<Teste />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
