import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import PokemonContextProvider from "./contexts/PokemonContextProvider";
import "./index.css";
import Error404 from "./pages/Error404";
import Index from "./pages/Index";
import PokemonTeam from "./pages/PokemonTeam";
import PokemonSearch from "./pages/PokemonSearch";
 
const router = createBrowserRouter([
  { path: "/", Component: Index },
  { path: "/search-pokemon", Component: PokemonSearch },
  { path: "/my-team", Component: PokemonTeam },
  { path: "*", Component: Error404 },
]);
 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PokemonContextProvider>
      <RouterProvider router={router} />
    </PokemonContextProvider>
  </StrictMode>,
);
