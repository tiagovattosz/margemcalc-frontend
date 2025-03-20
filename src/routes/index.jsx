import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import ProductsList from "../components/ProductsList";
import ProductDetails from "../components/ProductDetails";
import BotaoAdicionarProduto from "../components/BotaoAdicionarProduto";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch("/api/produtos", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Erro ao listar produtos");
        console.error(e);
      }
    }

    fetchProdutos();
  }, []);

  async function handleProductClick(id) {
    try {
      setIsFormActive(false);
      const response = await fetch(`/api/produtos/${id}`);
      const data = await response.json();
      setSelectedProduct(data);
      console.log(data);
    } catch (e) {
      console.error("Erro ao consultar produto");
      console.error(e);
    }
  }

  function handleAdicionarProduto() {
    setIsFormActive(true);
    setSelectedProduct(null);
    console.log(isFormActive);
  }

  return (
    <div className="h-screen flex">
      <div className="bg-gray-100 border-r h-full w-[260px] flex flex-col overflow-y-auto px-2 py-3 gap-1">
        <BotaoAdicionarProduto
          handleOnClick={() => {
            handleAdicionarProduto();
          }}
        />
        <ProductsList
          products={products}
          selectedProduct={selectedProduct}
          onProductClick={handleProductClick}
        />
      </div>
      <div className="flex flex-col grow">
        <Header />
        <div className="flex flex-col grow overflow-y-auto p-3">
          <ProductDetails product={selectedProduct} />
        </div>
      </div>
    </div>
  );
}
