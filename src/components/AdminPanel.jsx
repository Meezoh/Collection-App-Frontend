import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import User from "./Users";
import { MdDeleteOutline } from "react-icons/md";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);
  const token = localStorage.getItem("authToken");
  const activeUser = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const findUser =
    users.length > 0 && users.find((user) => user.email == activeUser);

  // role == "admin" &&
  useEffect(() => {
    fetch("https://item-um.herokuapp.com/api/users/", {
      headers: { "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.users);
        if (result.message) {
          throw Error(result.message);
        }
      })
      .catch((err) => console.log(err));
    if (users.length > 0) {
      if (!findUser) {
        localStorage.removeItem("authToken");
      }
    }

    if (findUser == undefined) {
      navigate("/login");
    }

    if (findUser && findUser.status == false) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  }, [update]);

  // Handle Select to update each collection
  const handleSelect = (selected, activeUserId) => {
    console.log(selected, activeUserId);
    fetch("https://item-um.herokuapp.com/api/users/" + activeUserId, {
      method: "PATCH",
      body: JSON.stringify({ selected: !selected }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    fetch("https://item-um.herokuapp.com/api/users/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleBlock = () => {
    fetch("https://item-um.herokuapp.com/api/users/", {
      method: "PATCH",
      body: JSON.stringify({ status: false }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleUnblock = () => {
    fetch("https://item-um.herokuapp.com/api/users/", {
      method: "PATCH",
      body: JSON.stringify({ status: true }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleAddAdmin = () => {};
  const handleRemoveAdmin = () => {};

  return (
    <div className="AdminPanel">
      <div>
        <h1 className="admin"> Admin Panel </h1>
        <div className="toolbar">
          <div className="tool-left">
            <Button
              onClick={handleAddAdmin}
              type="button"
              className="btn btn-primary"
              // size="sm"
            >
              Add admin
            </Button>
            <Button
              onClick={handleRemoveAdmin}
              type="button"
              className="btn btn-secondary"
              // size="sm"
            >
              Remove admin
            </Button>
          </div>
          <div className="tool-right">
            <Button
              onClick={handleBlock}
              type="button"
              className="btn btn-danger"
              // size="sm"
            >
              Block
            </Button>
            <Button
              onClick={handleUnblock}
              type="button"
              className="btn btn-secondary"
              variant="top"
              // size="sm"
            >
              Unblock
            </Button>
            <Button
              onClick={handleDelete}
              type="button"
              className="btn btn-dark"
              // size="sm"
            >
              <MdDeleteOutline size={22} />
            </Button>
          </div>
        </div>
      </div>

      <Table className="table" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Select</th>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => {
              const {
                name,
                email,
                lastLoggedIn,
                createdAt,
                status,
                _id,
                selected,
                role,
              } = user;
              let newId = i + 1;
              return (
                <User
                  key={i}
                  name={name}
                  email={email}
                  lastLoggedIn={lastLoggedIn}
                  createdAt={createdAt}
                  status={status}
                  selected={selected}
                  id={_id}
                  newId={newId}
                  handleSelect={handleSelect}
                  role={role}
                />
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPanel;
