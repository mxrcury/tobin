import Header from "./components/Header/Header";
import { Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";

import { initializeApp } from "firebase/app";

const app = initializeApp({
  apiKey: "AIzaSyBmNqqPcoThRXLERq2I7qprHCaJS8PXLgM",
  authDomain: "todo-app-884bd.firebaseapp.com",
  projectId: "todo-app-884bd",
  storageBucket: "todo-app-884bd.appspot.com",
  messagingSenderId: "379210395975",
  appId: "1:379210395975:web:8f9055f88d369d5f799c62"
});


const App = (props) => {

  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [loggedUsername,setLoggedUsername] = useState('')

  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loggedUsername={loggedUsername}/>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoggedUsername={setLoggedUsername}/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
