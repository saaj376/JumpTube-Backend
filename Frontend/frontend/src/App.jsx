import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes.js";
import "./App.css";

function App() {
  const routing = useRoutes(routes);
  return <div className="app-container">{routing}</div>;
}

export default App;
