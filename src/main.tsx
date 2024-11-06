import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { VendingMachineProvider } from "./contexts/VendingMachineContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VendingMachineProvider>
      <App />
    </VendingMachineProvider>
  </StrictMode>
);
