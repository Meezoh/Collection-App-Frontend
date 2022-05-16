import { ItemProvider } from "./contexts/ItemContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="App">
      <ItemProvider>
        <NavBar />
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path={"/admin"} element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ItemProvider>
    </div>
  );
};

export default App;
