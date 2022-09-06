import Header from "./components/Header/Header";
import { Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import './firebase/firebase'
import PresentPage from './pages/PresentPage';



const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/todo-app/" element={<PresentPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
