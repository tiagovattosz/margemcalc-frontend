import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ProdutoForm from "../../components/ProdutoForm";

export const Route = createFileRoute("/produtos/novo")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    precoCompra: "",
    precoVenda: "",
    porcentagemComissaoCompra: "",
    valorFixoComissaoCompra: "",
    porcentagemTaxaVenda: "",
    valorFixoTaxaVenda: "",
    linksDeCompra: [],
    linksDeVenda: [],
  });

  async function handleSubmit() {
    try {
      const response = await fetch("/api/produtos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate({ to: "/produtos" });
      }
    } catch (e) {
      console.error("Erro ao enviar formulário");
      console.error(e);
    }
  }

  return (
    <ProdutoForm
      title={"Novo produto"}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}
