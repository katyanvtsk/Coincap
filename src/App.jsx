import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Routes, Route } from "react-router";
import InfoPage from "./pages/InfoPage";
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
