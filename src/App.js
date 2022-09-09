import Header from "./components/Header/Header";
import { Link, Route, Routes, useParams } from "react-router-dom";
import ToDoPage from "./pages/ToDoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import "./firebase/firebase";
import PresentPage from "./pages/PresentPage";
import NotesPage from "pages/NotesPage";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        <div>
          <Link to="/todos">Todos</Link>
        </div>
        <div>
          <Link to="/notes">Notes</Link>
        </div>
      </div>
      <Routes>
        <Route path="/todo-app/" element={<PresentPage />} />
        <Route path="/todos" element={<ToDoPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
