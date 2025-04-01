import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/produtos/$id/editar")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello! "/produtos/$id/editar"!</div>;
}
