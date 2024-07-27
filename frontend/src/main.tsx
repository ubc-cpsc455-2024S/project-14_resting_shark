import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  //  const { worker } = await import("./api/mock/browser.ts");

  // comment out this line to shut down mock server
  //  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
