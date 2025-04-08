import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export const Route = createFileRoute("/_authenticated/produtos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [products, setProducts] = useState([]);
  const [loading, isLoading] = useState(true);

  function formatarMoeda(valor) {
    if (!valor) {
      return "";
    }
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

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

  function getLucroColor(lucroFinal, porcentagem) {
    if (lucroFinal < 0) return "#dc2626";

    if (porcentagem >= 50) return "#16a34a";

    const startColor = [250, 204, 21];
    const endColor = [22, 163, 74];

    const ratio = porcentagem / 50;
    const interpolated = startColor.map((start, i) =>
      Math.round(start + (endColor[i] - start) * ratio)
    );

    return `rgb(${interpolated.join(",")})`;
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
        isLoading(false);
      } catch (e) {
        console.error("Erro ao listar produtos");
        console.error(e);
      }
    }

    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <div className="w-screen flex mt-30 justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="sm" className="mb-4">
      <div className="flex justify-center mb-4">
        <Button
          variant="contained"
          fullWidth
          disableElevation
          component={Link}
          to="/produtos/novo"
        >
          Novo Produto
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {products.map((product) => {
          return (
            <Card variant="outlined" key={product.id}>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">{product.nome}</p>

                  <div className="flex gap-2">
                    <IconButton
                      component={Link}
                      to={`/produtos/${product.id}/editar`}
                      color="primary"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={(event) => {
                        event.stopPropagation();
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
                </div>

                <p>Preço de compra: {formatarMoeda(product.precoCompra)}</p>

                <p>Preço de venda: {formatarMoeda(product.precoVenda)}</p>

                <p className="mt-4 font-semibold text-lg">Comissões e taxas</p>

                <p>
                  Comissão: {formatarMoeda(product.valorTotalComissaoCompra)} (
                  {product.porcentagemComissaoCompra}% +{" "}
                  {formatarMoeda(product.valorFixoComissaoCompra)})
                </p>

                <p>
                  Taxa: {formatarMoeda(product.valorTotalTaxaVenda)} (
                  {product.porcentagemTaxaVenda}% +{" "}
                  {formatarMoeda(product.valorFixoTaxaVenda)})
                </p>

                <p className="mt-4 font-semibold text-lg">Margens</p>

                <p>
                  Lucro Final:{" "}
                  <span
                    style={{
                      color: getLucroColor(
                        product.lucroFinal,
                        product.porcentagemLucroFinal
                      ),
                    }}
                  >
                    {formatarMoeda(product.lucroFinal)} (
                    {product.porcentagemLucroFinal}%)
                  </span>{" "}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
