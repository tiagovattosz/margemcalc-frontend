import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

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
      console.error(e);
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
    <Container maxWidth="md" className="mb-4">
      <div className="flex justify-center mb-4">
        <Button variant="contained">
          <Link to="/produtos/novo">Novo Produto</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <Card variant="outlined" key={product.id}>
            <CardContent className="flex justify-between items-center">
              <p className="text-lg">
                {product.id} - {product.nome}
              </p>

              <div className="flex gap-2">
                <IconButton
                  component={Link}
                  to={`/produtos/${product.id}/editar`}
                  color="primary"
                >
                  <Edit />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Deseja excluir o produto "${product.nome}"?`
                      )
                    ) {
                      handleDeleteClick(product.id);
                    }
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
