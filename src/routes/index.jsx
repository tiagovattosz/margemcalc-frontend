import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <h1>Index!</h1>;
}
