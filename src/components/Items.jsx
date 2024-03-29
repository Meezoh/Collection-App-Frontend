import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ReactMarkdown from "react-markdown";
import GlobalContext from "../contexts/GlobalContext";
import { useContext, useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ItemForm from "./ItemForm";
import ItemCard from "./ItemCard";
import Axios from "axios";

const Items = () => {
  const [form, setForm] = useState(null);
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  // const [activeItemName, setActiveItemName] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [name, setName] = useState("");
  const [tag, setTag] = useState([]);
  const [image, setImage] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [active, setActive] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [detailsItemId, setDetailsItemId] = useState(null);
  const navigate = useNavigate();
  const { itemId, setItemId, item, setItem } = useContext(GlobalContext);

  const details = { name, tag, image };

  const token = localStorage.getItem("authToken");
  const obj = localStorage.getItem("kollection");
  const userName = localStorage.getItem("userName");

  const kollection = JSON.parse(obj);
  const nameKollection = kollection.name;
  const imageKollection = kollection.image;
  const descriptionKollection = kollection.description;
  const topicKollection = kollection.topic;
  const kollectionId = kollection._id;

  useEffect(() => {
    if (kollectionId) {
      fetch("https://item-um.herokuapp.com/api/items/" + kollectionId, {
        headers: { "x-access-token": token },
      })
        .then((res) => res.json())
        .then((result) => {
          setItems(result.items);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmitItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form == "create") {
      fetch("https://item-um.herokuapp.com/api/items/create/" + kollectionId, {
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
          setItemId(result.item._id);
          setItems([result.item, ...items]);
          setUpdate(!update);
        })
        .catch((err) => console.log(err));
    } else if (form == "edit") {
      const name = details.name == "" ? active.name : details.name;
      const tag = details.tag == "" ? active.tag : details.tag;

      fetch("https://item-um.herokuapp.com/api/items/create/" + activeItemId, {
        method: "PATCH",
        body: JSON.stringify({ ...details, name, tag, image }),
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

  const handleSelect = (selected, id) => {
    fetch("https://item-um.herokuapp.com/api/items/" + id, {
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
    fetch("https://item-um.herokuapp.com/api/items/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleEditItem = async (id) => {
    setActive(items.find((item) => item._id == id));
    setActiveItemId(id);
    setForm("edit");
  };

  const handleCreateItem = () => {
    setForm("create");
  };

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleCancelForm = () => {
    setForm(null);
  };

  const handleImageUpload = (files) => {
    setImageSelected(files);
    setImageUploading(true);
  };

  const removeTags = (indexToRemove) => {
    setTag([...tag.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (e) => {
    if (e.target.value !== "") {
      setTag([...tag, e.target.value]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (imageSelected) {
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "ytjjyrko");

      Axios.post(
        "https://api.cloudinary.com/v1_1/meezoh/image/upload",
        formData
      ).then((response) => {
        setImage(response.data.secure_url);
        setImageUploading(false);
      });
    }
  }, [imageSelected]);

  useEffect(() => {
    setImageUploading(false);
  }, [image]);

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
            <Card.Img variant="top" src={imageKollection} />
          </div>
          <div className="body">
            <Card.Body>
              <Card.Title>Name: {nameKollection}</Card.Title>
              <Card.Text>Topic: {topicKollection}</Card.Text>
              Description:
              <ReactMarkdown children={descriptionKollection} />
            </Card.Body>
          </div>
        </div>

        {form && (
          <ItemForm
            removeTags={removeTags}
            addTags={addTags}
            handleSubmitItem={handleSubmitItem}
            handleNameChange={handleNameChange}
            handleImageUpload={handleImageUpload}
            active={active}
            name={name}
            tag={tag}
            image={image}
            activeItemId={activeItemId}
            loading={loading}
            handleCancelForm={handleCancelForm}
            imageUploading={imageUploading}
          />
        )}

        <h2 className="items-heading">Items</h2>
        <ItemCard
          items={items}
          handleSelect={handleSelect}
          handleEditItem={handleEditItem}
          itemId={itemId}
          // handleDetails={handleDetails}
        />
      </div>
    </>
  );
};

export default Items;
