import { createFileRoute, redirect } from "@tanstack/react-router";

async function isAuthenticated() {
  try {
    const response = await fetch("/api/me", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      return true;
    }
    return false;
  } catch (e) {
    console.error("Erro ao obter informações do usuário");
    console.error(e);
  }
}

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (!(await isAuthenticated())) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
