import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <div className="container mx-auto p-4">
      <div className="h-12 flex items-center justify-end gap-5 text-lg">
        <Link to="/produtos" className="[&.active]:font-bold">
          Produtos
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Header;
