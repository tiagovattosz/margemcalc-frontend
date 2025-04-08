import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Carregar dados do usuário autenticado
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("Erro ao buscar usuário", e);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate({ to: "/login" });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="h-12 flex items-center justify-between text-lg">
        <Link to="/">
          <img src="/icon.png" alt="Logo" className="h-12" />
        </Link>

        <div className="flex gap-5 text-lg items-center">
          <Link to="/" className="[&.active]:text-blue-600">
            Home
          </Link>
          <Link to="/sobre" className="[&.active]:text-blue-600">
            Sobre
          </Link>
          <Link to="/produtos" className="[&.active]:text-blue-600">
            Produtos
          </Link>

          {user ? (
            <>
              <span>Olá, {user.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-600 text-white rounded px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white rounded px-4 py-1"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
