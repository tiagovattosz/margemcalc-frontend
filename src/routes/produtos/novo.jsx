import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/produtos/novo")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    nome: "",
    precoCompraCentavos: 0,
    precoVendaCentavos: 0,
    porcentagemComissaoCompra: 0,
    valorFixoComissaoCompraCentavos: 0,
    porcentagemComissaoVenda: 0,
    valorFixoComissaoVendaCentavos: 0,
    linksDeCompra: [],
    linksDeVenda: [],
  });

  async function handleSubmit() {
    try {
      await fetch("/api/produtos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (e) {
      console.error("Erro ao enviar formulário");
    }
  }
  return (
    <form
      className="flex flex-col w-150 ml-10"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h1>Novo Produto</h1>

      <label htmlFor="nome">Nome</label>
      <input
        required
        className="border"
        type="text"
        name="nome"
        id="nome"
        onChange={(e) => {
          setFormData({ ...formData, nome: e.target.value });
        }}
      />

      <label htmlFor="precoCompraCentavos">Preço de compra</label>
      <input
        required
        className="border"
        type="number"
        name="precoCompraCentavos"
        id="precoCompraCentavos"
        step={0.01}
        min={0}
        onChange={(e) => {
          setFormData({
            ...formData,
            precoCompraCentavos: Math.round(parseFloat(e.target.value) * 100),
          });
        }}
      />

      <label htmlFor="precoVendaCentavos">Preço de venda</label>
      <input
        required
        className="border"
        type="number"
        name="precoVendaCentavos"
        id="precoVendaCentavos"
        step={0.01}
        min={0}
        onChange={(e) => {
          setFormData({
            ...formData,
            precoVendaCentavos: Math.round(parseFloat(e.target.value) * 100),
          });
        }}
      />

      <label htmlFor="porcentagemComissaoCompra">Porcentagem comissão</label>
      <input
        required
        className="border"
        type="number"
        name="porcentagemComissaoCompra"
        id="porcentagemComissaoCompra"
        step={0.01}
        min={0}
        onChange={(e) => {
          setFormData({
            ...formData,
            porcentagemComissaoCompra: e.target.value,
          });
        }}
      />

      <label htmlFor="valorFixoComissaoCompraCentavos">
        Valor fixo comissão
      </label>
      <input
        required
        className="border"
        type="number"
        name="valorFixoComissaoCompraCentavos"
        id="valorFixoComissaoCompraCentavos"
        step={0.01}
        min={0}
        onChange={(e) => {
          setFormData({
            ...formData,
            valorFixoComissaoCompraCentavos: Math.round(
              parseFloat(e.target.value) * 100
            ),
          });
        }}
      />

      <label htmlFor="porcentagemComissaoVenda">Porcentagem taxa</label>
      <input
        required
        className="border"
        type="number"
        name="porcentagemComissaoVenda"
        id="porcentagemComissaoVenda"
        step={0.01}
        min={0}
        onChange={(e) => {
          setFormData({
            ...formData,
            porcentagemComissaoVenda: e.target.value,
          });
        }}
      />

      <label htmlFor="valorFixoComissaoVendaCentavos">
        Valor fixo comissão
      </label>
      <input
        required
        className="border"
        type="number"
        name="valorFixoComissaoVendaCentavos"
        id="valorFixoComissaoVendaCentavos"
        step={0.01}
        min={0}
        onChange={(e) => {
          setFormData({
            ...formData,
            valorFixoComissaoVendaCentavos: Math.round(
              parseFloat(e.target.value) * 100
            ),
          });
        }}
      />

      <button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          setFormData({
            ...formData,
            linksDeCompra: [...formData.linksDeCompra, { url: "" }],
          });
        }}
      >
        Adicionar link de compra
      </button>

      {formData.linksDeCompra.map((link, index) => (
        <input
          key={index}
          type="text"
          value={link.url}
          onChange={(e) => {
            const links = formData.linksDeCompra;
            links[index] = { url: e.target.value };
            setFormData({ ...formData, linksDeCompra: links });
          }}
        />
      ))}

      <button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          setFormData({
            ...formData,
            linksDeVenda: [...formData.linksDeVenda, { url: "" }],
          });
        }}
      >
        Adicionar link de venda
      </button>

      {formData.linksDeVenda.map((link, index) => (
        <input
          key={index}
          type="text"
          value={link.url}
          onChange={(e) => {
            const links = formData.linksDeVenda;
            links[index] = { url: e.target.value };
            setFormData({ ...formData, linksDeVenda: links });
          }}
        />
      ))}

      <button className="cursor-pointer" type="submit">
        Enviar
      </button>
    </form>
  );
}
