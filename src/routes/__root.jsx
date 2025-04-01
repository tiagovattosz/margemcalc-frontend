import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => {
    const matchRoute = useMatchRoute();

    const isLoginPage = matchRoute({ to: "/login" });

    return (
      <>
        {!isLoginPage && <Header />}
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
