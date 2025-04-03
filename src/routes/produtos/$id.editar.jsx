import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ProdutoForm from "../../components/ProdutoForm";
import { CircularProgress, Container } from "@mui/material";

export const Route = createFileRoute("/produtos/$id/editar")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch(`/api/produtos/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFormData(data);
        }
      } catch (e) {
        console.error("Erro ao buscar produto.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [id]);

  async function handleSubmit() {
    try {
      await fetch(`/api/produtos/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      navigate({ to: "/produtos" });
    } catch (e) {
      console.error("Erro ao atualizar produto.");
      console.error(e);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-70">
        <CircularProgress />
      </div>
    );
  }

  if (!formData) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <ProdutoForm
      title={"Editar produto"}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}
