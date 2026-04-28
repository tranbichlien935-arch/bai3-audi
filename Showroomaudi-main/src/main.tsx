import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
import { Storefront } from "./app/Storefront.tsx";
import "./styles/index.css";

const path = window.location.pathname;

if (path.startsWith("/admin")) {
  createRoot(document.getElementById("root")!).render(<App />);
} else {
  createRoot(document.getElementById("root")!).render(<Storefront />);
}