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
      <img
        src="icon.png"
        alt="Logo"
        className="absolute top-10 left-10 max-w-15"
      />
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 bg-white border p-8 mx-4 rounded-lg"
        >
          <h2 className="text-center font-bold text-2xl mb-10">Login</h2>
          <div className="flex flex-col">
            <input
              placeholder="Email"
              className="border-b-1 border-black placeholder:text-gray-500 p-2 mb-5"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Senha"
              className="border-b-1 border-black placeholder:text-gray-500 p-2"
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
          <button className="pt-3 cursor-pointer">Criar conta</button>
        </form>
      </div>
    </div>
  );
}
