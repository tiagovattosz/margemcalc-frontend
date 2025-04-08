import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
});

function Sobre() {
  return <h1>Sobre!</h1>;
}
