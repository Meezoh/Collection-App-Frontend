import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const User = (props) => {
  const {
    name,
    role,
    email,
    createdAt,
    lastLoggedIn,
    newId,
    status,
    handleSelect,
    id,
    selected,
  } = props;
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const formatDate = (date) => {
    const now = new Date();
    const past = new Date(date);

    const calcDaysPassed = (date1, date2) => {
      return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    };

    const daysPassed = calcDaysPassed(past, now);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
      const day = `${past.getDate()}`.padStart(2, 0);
      const month = `${past.getMonth() + 1}`.padStart(2, 0);
      const year = past.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  useEffect(() => {
    fetch("https://item-um.herokuapp.com/api/users/", {
      method: "PATCH",
      body: JSON.stringify({ selected: false }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => null)
      .catch((err) => console.log(err));
  }, []);

  return (
    <tr>
      <td>
        <div className="mb-3">
          <Form.Check
            type="checkbox"
            onClick={() => handleSelect(selected, id)}
          />
        </div>
      </td>
      <td>{newId}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>{formatDate(lastLoggedIn)}</td>
      <td>{formatDate(createdAt)}</td>
      <td>{status ? "Active" : "Blocked"}</td>
    </tr>
  );
};

export default User;
