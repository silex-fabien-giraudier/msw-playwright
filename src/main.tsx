import { createRoot } from "react-dom/client";
import App from "./App";

async function prepare() {
  if (import.meta.env.DEV || (window as any).PLAYWRIGHT) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }

  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}

prepare();
