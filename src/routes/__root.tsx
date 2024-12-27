import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Provider } from "../components/ui/provider";

export const Route = createRootRoute({
  component: () => (
    <Provider>
      <Outlet />
      <TanStackRouterDevtools />
    </Provider>
  ),
});
