import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <>
      <Header></Header>
      <div className="container mx-auto">
        <div className="p-2">Hello from About!</div>
      </div>
    </>
  );
}
