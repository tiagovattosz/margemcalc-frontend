import { Link } from "@tanstack/react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import BarraAcoes from "./BarraAcoes";

function ProductDetails({ product, setProducts, setSelectedProduct }) {
  function formatarParaReais(valor) {
    return (valor / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  if (!product) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Selecione um produto para visualizar
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col w-200 overflow-y-auto p-3 border rounded">
        <h2 className="text-2xl font-bold">{product.nome}</h2>
        <p>Preço de compra: {formatarParaReais(product.precoCompraCentavos)}</p>
        <p>Preço de venda: {formatarParaReais(product.precoVendaCentavos)}</p>
        {product.links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <p>
              {link.compraOuVenda === "C" ? "Link de compra" : "Link de venda"}
            </p>
            <Link to={link.url} target="_blank">
              <FaExternalLinkAlt />
            </Link>
          </div>
        ))}
      </div>
      <BarraAcoes
        productId={product.id}
        setProducts={setProducts}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
}

export default ProductDetails;
