import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import ToDo from "./components/CRUD/ToDo.jsx";

function App() {

  return (
    <div className="container">
      <ToDo/>
    </div>
  );
}

export default App;
