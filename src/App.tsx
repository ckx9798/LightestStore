/** @format */

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Asd from "./test/asd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/asd" element={<Asd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
