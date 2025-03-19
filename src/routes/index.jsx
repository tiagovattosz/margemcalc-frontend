import { createFileRoute } from "@tanstack/react-router";
import Header from "../Header";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProdutos() {
      const response = await fetch("/api/produtos", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setProducts(data);
    }

    fetchProdutos();
  }, []);

  async function handleProductClick(id) {
    const response = await fetch(`/api/produtos/${id}`);
    const data = await response.json();
    console.log(data);
    setSelectedProduct(data);
  }

  return (
    <div className="h-screen flex">
      <div className="bg-gray-100 border-r h-full w-[260px] flex flex-col overflow-y-auto px-2 py-3 gap-1">
        <button className="bg-black text-white py-2 rounded cursor-pointer">
          Novo Produto
        </button>
        {products.map((product) => (
          <div
            key={product.id}
            className={` border rounded py-3 px-1 cursor-pointer ${selectedProduct?.id == product.id ? "bg-blue-200" : "bg-white"}`}
            onClick={() => handleProductClick(product.id)}
          >
            <span>{product.nome}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col grow">
        <Header />
        <div className="flex grow overflow-y-auto">
          {selectedProduct ? (
            <div></div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              Selecione um produto visualizar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
