import ReactMarkdown from "react-markdown";
import collectionArr from "../util/collectionTopics";
import { Link } from "react-router-dom";
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
  const [newName, setNewName] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");

  const { userId, kollectionId, setKollectionId, kollection, setKollection } =
    useContext(GlobalContext);

  // const { name, topic, description, image, selected, _id: id } = kollection;

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const details = { newName, newTopic, newDescription, newImage };

  // Handle form submit
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
        // [...kollections, data.newkollection];
      })
      .catch((err) => console.log(err));
  };

  // Load all of User's collections
  useEffect(() => {
    fetch("https://item-um.herokuapp.com/api/collections/user/" + userId, {
      headers: { "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        setKollections(data.kollections);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  // Handle Select to update each collection
  const handleSelect = (selected, id) => {
    console.log(id);
    fetch("https://item-um.herokuapp.com/api/collections/" + id, {
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

  return (
    <div className="collection">
      <h1>User Collections</h1>

      <Form className="add-collection" onSubmit={handleCollection}>
        <Col>
          <Form.Control
            className="name"
            placeholder="Name your collection"
            onChange={(e) => setNewName(e.target.value)}
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
              value={newDescription}
              required
              onChange={(e) => setNewDescription(e.target.value)}
            />
            {/* <ReactMarkdown children={description} /> */}
          </Col>
        </Form.Group>

        <Form.Select
          className="select-collection"
          aria-label="Default select example"
          onChange={(e) => setNewTopic(e.target.value)}
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
              onChange={(e) => setNewImage(e.target.value)}
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
          {kollections.map((kollection, i) => {
            return (
              <tr>
                {/* <Link to="/items"> */}
                <td>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      // onClick={() => handleSelect(selected, id)}
                    />
                  </div>
                </td>
                <td>{i + 1}</td>
                <td>{kollection.name}</td>
                <td>{kollection.topic}</td>
                <td>{kollection.description}</td>
                <td>{kollection.image || null}</td>
                {/* </Link> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Collection;
