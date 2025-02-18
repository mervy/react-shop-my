// Checkout.jsx
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    // Aqui você pode adicionar o processo de pagamento ou de finalização de compra
    alert('Processando pagamento...');
    clearCart(); // Limpa o carrinho após o checkout
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h3>Não há itens no carrinho para finalizar a compra.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3>Finalizar Compra</h3>
      <div>
        <h5>Total: R${totalPrice}</h5>
        <button className="btn btn-danger" onClick={handleCheckout}>Confirmar Compra</button>
      </div>
    </div>
  );
};

export default Checkout;
