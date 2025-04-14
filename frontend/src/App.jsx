import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
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
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
