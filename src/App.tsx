import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Reset } from "styled-reset";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import NotFound from "./pages/NotFound";
import Room from "./pages/Room";

function App() {
  return (
    <RecoilRoot>
      <Reset />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/host" element={<Home />} />
          <Route path="/" element={<Lobby />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
