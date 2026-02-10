import { Routes, Route } from "react-router-dom";
import Home from "./components/HeroSection.jsx";
import CarPredictor from "./components/CarPredictor.jsx";
import BikePredictor from "./components/BikePredictor.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatwithus" element={<Chatbot />} />
        <Route path="/car" element={<CarPredictor />} />
        <Route path="/bike" element={<BikePredictor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Footer />
    </>
  );
}
