import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ApolloWrapper from "./context/ApolloClient";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloWrapper>
    <App />
  </ApolloWrapper>
);
