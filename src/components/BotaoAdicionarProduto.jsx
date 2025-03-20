function BotaoAdicionarProduto({ handleOnClick }) {
  return (
    <button
      className="bg-black text-white py-2 rounded cursor-pointer"
      onClick={() => {
        handleOnClick();
      }}
    >
      Novo Produto
    </button>
  );
}

export default BotaoAdicionarProduto;
