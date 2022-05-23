import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Collection from "./components/Collection";
import Items from "./components/Items";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items" element={<Items />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/collections/:userId" element={<Collection />} />
          <Route path={"/admin/:userId"} element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
