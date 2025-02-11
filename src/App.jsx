import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Retrieve from "./components/CRUD/Retrieve.jsx";

function App() {

  return (
    <div className="container">
      <Retrieve/>
    </div>
  );
}

export default App;
