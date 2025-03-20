import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <div className="h-12 flex items-center justify-end gap-5 text-lg pr-10">
      <Link to="/" className="[&.active]:font-bold">
        Produtos
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link>
    </div>
  );
}

export default Header;
