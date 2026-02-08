import { Routes, Route } from "react-router-dom";
import Home from "./components/HeroSection.jsx";
import CarPredictor from "./components/CarPredictor.jsx";
import BikePredictor from "./components/BikePredictor.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatwithus" element={<ChatBot />} />
        <Route path="/car" element={<CarPredictor />} />
        <Route path="/bike" element={<BikePredictor />} />
      </Routes>

      <Footer />
    </>
  );
}
