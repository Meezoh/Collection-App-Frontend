import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ReactMarkdown from "react-markdown";
import GlobalContext from "../contexts/GlobalContext";
import { useContext, useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ItemForm from "./ItemForm";

const Items = () => {
  const [form, setForm] = useState(null);
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemTag, setItemTag] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [active, setActive] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [detailsItemId, setDetailsItemId] = useState(null);

  const details = { itemName, itemTag, itemImage };

  const token = localStorage.getItem("authToken");
  const obj = localStorage.getItem("kollection");
  const userName = localStorage.getItem("userName");
  const { setToggleModal } = useContext(GlobalContext);

  const kollection = JSON.parse(obj);
  const name = kollection.name;
  const image = kollection.image;
  const description = kollection.description;
  const topic = kollection.topic;
  const kollectionId = kollection._id;

  // const handleEditCollection = (kollectionId) => {
  //   console.log(kollectionId);
  //   setActive(kollections.find((kollection) => kollection._id == kollectionId));
  //   setActiveKollectionId(kollectionId);
  //   setForm("edit");
  // };

  // Load all items
  useEffect(() => {
    if (kollectionId) {
      fetch("http://item-um.herokuapp.com/api/items/" + kollectionId, {
        headers: { "x-access-token": token },
      })
        .then((res) => res.json())
        .then((result) => {
          setItems(result.items);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // Handle form submit
  const handleSubmitCollection = (e) => {
    e.preventDefault();
    setLoading(true);

    if (form == "create") {
      fetch("url" + kollectionId, {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setForm(null);
        })
        .catch((err) => console.log(err));
    } else if (form == "edit") {
      const name = details.itemName == "" ? active.itemName : details.itemName;
      const topic = details.itemTag == "" ? active.itemTag : details.itemTag;

      fetch("url" + activeItemId, {
        method: "PATCH",
        body: JSON.stringify({ ...details, name, description, topic, image }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setUpdate(!update);
          setForm(null);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSelect = (selected, kollectionId) => {};
  const handleDetails = (kollectionId) => {};
  const handleDelete = () => {};
  const handleCreateItem = () => {
    setForm("create");
  };
  const handleNameChange = () => {};
  const handleTagChange = () => {};
  const handleImageUpload = () => {};
  const handleCancelForm = () => {};

  return (
    <>
      <div className="Items">
        <div className="item-header">
          <h2 className="collection-title">{userName} Collections</h2>
          <div className="toolbar">
            <Button
              variant="primary"
              size="lg"
              active
              onClick={() => handleCreateItem(setForm("create"))}
            >
              New Item
            </Button>
            <Button
              onClick={handleDelete}
              type="button"
              className="btn btn-dark btn-dark-collection"
            >
              <MdDeleteOutline size={22} />
            </Button>
          </div>
        </div>

        <div className="details">
          <div className="image">
            <Card.Img variant="top" src={image} />
          </div>
          <div className="body">
            <Card.Body>
              <Card.Title>Name: {name}</Card.Title>
              <Card.Text>Topic: {topic}</Card.Text>
              Description:
              <ReactMarkdown children={description} />
            </Card.Body>
          </div>
        </div>

        <h2 className="items-heading">Items</h2>

        {items && (
          <div className="items">
            <Row xs={1} md={2} lg={3} className="g-4">
              {items.map((item, i) => {
                const {
                  name,
                  topic,
                  description,
                  image,
                  selected,
                  _id: kollectionId,
                } = item;
                return (
                  <Col key={i}>
                    <Card className="card">
                      <Card.Img variant="top" src={image} />
                      <div className="check-view">
                        <Form.Check
                          type="checkbox"
                          onClick={() => handleSelect(selected, kollectionId)}
                        />

                        <Button
                          variant="primary"
                          size="md"
                          active
                          onClick={() => handleDetails(kollectionId)}
                        >
                          Details
                        </Button>
                      </div>
                      <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{topic}</Card.Text>
                        <Card.Text>{description}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </div>

      {form && (
        <ItemForm
          handleSubmitCollection={handleSubmitCollection}
          handleNameChange={handleNameChange}
          handleTagChange={handleTagChange}
          handleImageUpload={handleImageUpload}
          active={active}
          itemName={itemName}
          itemTag={itemTag}
          itemImage={itemImage}
          activeItemId={activeItemId}
          loading={loading}
          handleCancelForm={handleCancelForm}
        />
      )}
    </>
  );
};

export default Items;
