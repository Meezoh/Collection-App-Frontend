import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);
  const token = localStorage.getItem("authToken");
  const activeUser = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const findUser =
    users.length > 0 && users.find((user) => user.email == activeUser);
  console.log(users.length > 0 && findUser);

  fetch("https://kollection.herokuapp.com/api/login", {
    headers: { "x-access-token": token },
  })
    .then((res) => res.json())
    .then((res) => {
      setUsers(res.users);
    })
    .catch((err) => console.log(err));

  return (
    <div className="AdminPanel">
      <h1 className="admin-panel"> Admin Panel </h1>
    </div>
  );
};

export default AdminPanel;
