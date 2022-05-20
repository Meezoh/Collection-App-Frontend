import ReactMarkdown from "react-markdown";
import collectionArr from "../util/collectionTopics";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { CgUnblock } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import GlobalContext from "../contexts/GlobalContext";

const Collection = () => {
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [kollections, setKollections] = useState([]);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { userId, kollectionId, setKollectionId } = useContext(GlobalContext);

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const details = { name, topic, description };

  const handleCollection = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://item-um.herokuapp.com/api/collections/create/" + userId, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setKollectionId(data.newKollection._id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("https://item-um.herokuapp.com/api/collections/user/" + userId, {
      headers: { "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => setKollections(data.kollections))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="collection">
      <h1>User Collections</h1>

      <Form className="add-collection" onSubmit={handleCollection}>
        <Col>
          <Form.Control
            className="name"
            placeholder="Name your collection"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Col>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col sm={13}>
            <Form.Control
              autoFocus
              as="textarea"
              rows={3}
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <ReactMarkdown children={description} /> */}
          </Col>
        </Form.Group>

        <Form.Select
          className="select-collection"
          aria-label="Default select example"
          onChange={(e) => setTopic(e.target.value)}
        >
          <option>Select a topic</option>
          {collectionArr.map((collection, i) => {
            return <option key={i}>{collection}</option>;
          })}
        </Form.Select>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Col sm={13}>
            <Form.Control
              type="file"
              placeholder="Topic"
              onChange={(e) => setImage(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button disabled={loading ? true : false} type="submit">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Form>

      <Table className="table" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Select</th>
            <th>id</th>
            <th>Name</th>
            <th>Topic</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {/* {users &&
            users.map((user, i) => {
              const {
                name,
                email,
                lastLoggedIn,
                createdAt,
                status,
                _id,
                selected,
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
                />
              );
            })} */}
        </tbody>
      </Table>
    </div>
  );
};

export default Collection;
