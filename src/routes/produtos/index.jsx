import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/produtos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [products, setProducts] = useState([]);

  async function handleDeleteClick(productId) {
    try {
      await fetch("/api/produtos/" + productId, {
        method: "DELETE",
        credentials: "include",
      });

      setProducts((products) =>
        products.filter((product) => product.id !== productId)
      );
    } catch (e) {
      console.error("Erro ao excluir produto");
    }
  }

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

  return (
    <div className="container mx-auto p-4">
      <button className="cursor-pointer">
        <Link to={`/produtos/novo`}>Novo Produto</Link>
      </button>
      {products.map((product) => (
        <div className="flex p-5 gap-5">
          <h2>
            {product.id} - {product.nome}
          </h2>

          <button className="cursor-pointer">
            <Link to={`/produtos/${product.id}/editar`}>Editar</Link>
          </button>

          <button
            className="cursor-pointer"
            onClick={() => {
              if (confirm(`Deseja excluir o produto "${product.nome}"?`)) {
                handleDeleteClick(product.id);
              }
            }}
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
