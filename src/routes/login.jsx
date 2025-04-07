import { Container } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

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
    <>
      <img
        src="icon.png"
        alt="Logo"
        className="absolute top-10 left-10 max-w-15"
      />
      <Container maxWidth="xs">
        <div className="h-screen flex items-center justify-center">
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 ">
            <h2 className="text-center font-bold text-2xl mb-10">
              Bem vindo(a) ao Margens!
            </h2>

            <TextField
              required
              label="Email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              required
              label="Senha"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error ? <p className="text-red-600">{error}</p> : null}

            <Button type="submit" variant="contained" disableElevation>
              Entrar
            </Button>
            <Button variant="text">Criar conta</Button>
          </form>
        </div>
      </Container>
    </>
  );
}
