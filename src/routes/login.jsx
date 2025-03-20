import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate({ from: "/" });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setError(null);
        navigate("/");
      } else if (response.status === 403) {
        setError("Credenciais inválidas.");
      }
    } catch (e) {
      console.error(e);
      setError("Erro interno, tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <img src="icon.png" alt="Logo" className="absolute top-10 left-10 w-15" />
      <div className="flex flex-col items-center rounded-lg border  bg-white px-10 py-20">
        <h2 className="font-bold text-2xl mb-10">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <div>
            <input
              placeholder="Email"
              className="border-b-1 border-black placeholder:text-gray-500 w-75 p-1 mb-5"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Senha"
              className="border-b-1 border-black placeholder:text-gray-500 w-75 p-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? <p className="text-red-600">{error}</p> : null}
          <button
            className="bg-black text-white font-semibold mt-10 rounded p-2 cursor-pointer"
            type="submit"
          >
            Entrar
          </button>
        </form>
        <button className="pt-3 cursor-pointer">Criar conta</button>
      </div>
    </div>
  );
}
