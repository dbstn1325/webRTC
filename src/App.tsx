import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Reset } from "styled-reset";

import Lobby from "./pages/Lobby";
import NotFound from "./pages/NotFound";
import Room from "./pages/Room";
import { GlobalStyle } from "./styles/global/GlobalStyle";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Reset />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/host" element={<Lobby />} />
          <Route path="/" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
