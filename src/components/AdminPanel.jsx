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

  //   if (users.length > 0) {
  //     if (!findUser) {
  //       localStorage.removeItem("authToken");
  //     }
  //   }

  //   if (findUser == undefined) {
  //     navigate("/login");
  //   }

  //   if (findUser && findUser.status == false) {
  //     localStorage.removeItem("authToken");
  //     navigate("/login");
  //   }
  // }, [update]);

  // const handleSelect = (selected, id) => {
  //   fetch("https://admin-be.herokuapp.com/api/v1/users/" + id, {
  //     method: "PATCH",
  //     body: JSON.stringify({ selected: !selected }),
  //     headers: { "Content-Type": "application/json", "x-access-token": token },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUpdate(!update);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleDelete = () => {
  //   fetch("https://admin-be.herokuapp.com/api/v1/users", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json", "x-access-token": token },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUpdate(!update);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleBlock = () => {
  //   fetch("https://admin-be.herokuapp.com/api/v1/users", {
  //     method: "PATCH",
  //     body: JSON.stringify({ status: false }),
  //     headers: { "Content-Type": "application/json", "x-access-token": token },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUpdate(!update);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleUnblock = () => {
  //   fetch("https://admin-be.herokuapp.com/api/v1/users", {
  //     method: "PATCH",
  //     body: JSON.stringify({ status: true }),
  //     headers: { "Content-Type": "application/json", "x-access-token": token },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUpdate(!update);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="AdminPanel">
      <h1 className="admin-panel"> Admin Panel </h1>
    </div>
  );
};

export default AdminPanel;
