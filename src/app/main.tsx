import "flatpickr/dist/flatpickr.css";
import "swiper/swiper-bundle.css";
import "../shared/ui/styles/index.css";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "../context/ThemeContext.tsx";

import { AppWrapper } from "../shared/ui/components/common/PageMeta.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);
