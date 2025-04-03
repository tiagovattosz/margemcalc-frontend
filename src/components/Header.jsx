import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <div className="container mx-auto p-4">
      <div className="h-12 flex items-center justify-between text-lg">
        <Link to="/">
          <img src="/icon.png" alt="Logo" className="h-12" />
        </Link>

        <div className="flex gap-5 text-lg">
          <Link to="/produtos" className="[&.active]:text-blue-600">
            Produtos
          </Link>
          <Link to="/about" className="[&.active]:text-blue-600">
            About
          </Link>
          <Link to="/login" className="[&.active]:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
