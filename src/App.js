import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import ToDoPage from "./pages/ToDoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./firebase/firebase";
import PresentPage from "./pages/PresentPage";
import NotesPage from "pages/NotesPage";
import { useAuth } from 'hooks/useAuth';
import Links from './components/Links/Links';

const App = () => {
  const {isAuth} = useAuth()

  return (
    <div className="app-container">
      <Header />
      {isAuth && <Links/>}
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
