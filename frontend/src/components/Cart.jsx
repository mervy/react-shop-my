// Cart.jsx
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h3>Seu carrinho está vazio.</h3>
        <Link to="/" className="btn btn-primary">Voltar à loja</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3>Seu Carrinho</h3>
      <div className="list-group">
        {cart.map((item) => (
          <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p>R${item.price} x {item.quantity}</p>
            </div>
            <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h5>Total: R${totalPrice}</h5>
        <button className="btn btn-warning" onClick={clearCart}>Limpar Carrinho</button>
        <Link to="/checkout" className="btn btn-success ms-2">Ir para Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;
