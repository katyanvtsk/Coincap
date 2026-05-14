import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import { Routes, Route } from "react-router";
import InfoPage from "./InfoPage";
import { useSelector } from "react-redux";
import { selectItems } from "./redux/userWalletSlice";

function App() {
  const wallet = useSelector(selectItems);
  useEffect(() => {
    localStorage.setItem("userWallet", JSON.stringify(wallet));
  }, [wallet]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info/:id" element={<InfoPage />} />
      </Routes>
    </>
  );
}

export default App;
