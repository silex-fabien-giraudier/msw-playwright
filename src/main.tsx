import { createRoot } from "react-dom/client";
import App from "./App";

async function prepare() {
  // Enable MSW in dev mode, when PLAYWRIGHT flag is set, or when running on localhost:4173 (preview server)
  if (import.meta.env.DEV || 
      (window as any).PLAYWRIGHT || 
      (window.location.hostname === 'localhost' && window.location.port === '4173')) {
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
