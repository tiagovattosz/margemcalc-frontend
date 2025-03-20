function ProductList({ products, selectedProduct, onProductClick }) {
  return products.map((product) => (
    <div
      key={product.id}
      className={`border rounded py-3 px-1 cursor-pointer ${
        selectedProduct?.id === product.id ? "bg-blue-200" : "bg-white"
      }`}
      onClick={() => onProductClick(product.id)}
    >
      <span>{product.nome}</span>
    </div>
  ));
}

export default ProductList;
