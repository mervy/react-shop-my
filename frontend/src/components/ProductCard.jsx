import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        <img src={product.image || '/path/to/default-image.jpg'} alt={product.name} className="card-img-top product-image"/>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">R${product.price}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}  // Chama addToCart passando o produto
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
