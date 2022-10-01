import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./firebase/firebase";
import Present from "./pages/Present";
import Notes from "pages/Notes";
import { useAuth } from 'hooks/useAuth';
import Links from './components/Links';

const App = () => {
  const {isAuth} = useAuth()

  return (
    <div className="app-container">
      <Header />
      {isAuth && <Links/>}
      <Routes>
        <Route path="/tobin/" element={<Present />} />
        <Route path="/todos" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
