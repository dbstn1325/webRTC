import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Room from "./pages/Room";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
