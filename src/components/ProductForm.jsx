import { useState } from "react";
function ProductForm() {
  const [formData, setFormData] = useState({
    nome: "",
    precoCompraCentavos: 0,
    precoVendaCentavos: 0,
    links: [],
  });

  async function handleSubmit() {
    console.log(formData);
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
    <div className="flex flex-col items-center justify-center grow overflow-y-auto p-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col w-150 gap-5 border p-10 rounded"
      >
        <p className="text-2xl font-bold">Novo Produto</p>
        <div className="flex flex-col">
          <label htmlFor="nome">Nome</label>
          <input
            required
            className="border-b p-1"
            type="text"
            name="nome"
            id="nome"
            onChange={(e) => {
              setFormData({ ...formData, nome: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="precoCompraCentavos">Preço de compra</label>
          <input
            required
            className="border-b p-1"
            type="number"
            name="precoCompraCentavos"
            id="precoCompraCentavos"
            step={0.01}
            min={0}
            onChange={(e) => {
              setFormData({
                ...formData,
                precoCompraCentavos: Math.round(
                  parseFloat(e.target.value) * 100
                ),
              });
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="precoVendaCentavos">Preço de venda</label>
          <input
            required
            className="border-b p-1"
            type="number"
            name="precoVendaCentavos"
            id="precoVendaCentavos"
            step={0.01}
            min={0}
            onChange={(e) => {
              setFormData({
                ...formData,
                precoVendaCentavos: Math.round(
                  parseFloat(e.target.value) * 100
                ),
              });
            }}
          />
        </div>

        <button
          className="bg-black rounded text-white w-40 p-1 self-center"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
