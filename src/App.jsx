import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import GamesPage from "./pages/GamesPage";
import SearchPage from "./pages/SearchPage";
import Cart from "./pages/Cart";
import Slider from "./components/slider/Slider";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="" element={<MainPage />} />
          <Route path="game/:id" element={<GamePage />} />
          <Route path="*" element={<div>asd</div>} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
      {/* <Slider /> */}
    </div>
  );
}

export default App;
