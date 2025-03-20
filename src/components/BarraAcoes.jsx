import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export default function BarraAcoes({
  productId,
  setProducts,
  setSelectedProduct,
}) {
  async function handleEditClick() {
    try {
      // TODO
    } catch (e) {
      console.error("Erro ao editar.");
    }
  }

  async function handleDeleteClick() {
    try {
      await fetch("/api/produtos/" + productId, {
        method: "DELETE",
        credentials: "include",
      });
      setProducts((products) =>
        products.filter((product) => product.id !== productId)
      );
      setSelectedProduct(null);
    } catch (e) {
      console.error("Erro ao excluir.");
    }
  }

  return (
    <div className="flex flex-col w-[50px] items-center ml-3 mt-3">
      <MdEdit
        size={40}
        className="cursor-pointer"
        onClick={() => {
          handleEditClick();
        }}
      />
      <MdDeleteForever
        size={40}
        className="cursor-pointer"
        onClick={() => {
          handleDeleteClick();
        }}
      />
    </div>
  );
}
