import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Button from "react-bootstrap/Button";

const CollectionList = (props) => {
  const {
    name,
    num,
    topic,
    handleSelect,
    description,
    image,
    selected,
    id,
    handleEditCollection,
  } = props;
  const token = localStorage.getItem("authToken");

  // Change selected to false
  useEffect(() => {
    fetch("https://item-um.herokuapp.com/api/collections/" + id, {
      method: "PATCH",
      body: JSON.stringify({ selected: false }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => null)
      .catch((err) => console.log(err));
  }, []);

  return (
    // <div className="CollectionList"></div>;
    <tr>
      {/* <Link to="/items"> */}
      <td>
        <div className="mb-3">
          <Form.Check
            type="checkbox"
            onClick={() => handleSelect(selected, id)}
          />
        </div>
      </td>
      <td>{num}</td>
      <td>{name}</td>
      <td>{topic}</td>
      <td>
        <ReactMarkdown children={description} />
      </td>
      <td>
        <img src={image} alt="" />
      </td>
      <td>
        <Button
          variant="secondary"
          size="lg"
          active
          onClick={() => handleEditCollection(id)}
        >
          Edit
        </Button>
      </td>
      {/* </Link> */}
    </tr>
  );
};

export default CollectionList;
