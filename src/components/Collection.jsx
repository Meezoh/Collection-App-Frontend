import collectionArr from "../util/collectionTopics";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import GlobalContext from "../contexts/GlobalContext";
import CollectioForm from "./CollectionForm";
import Axios from "axios";
import CollectionCard from "./CollectionCard";
import ReactMarkdown from "react-markdown";

const Collection = () => {
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);
  const [kollections, setKollections] = useState([]);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [active, setActive] = useState(null);
  const [activeKollectionId, setActiveKollectionId] = useState(null);

  const [noItems, setNoItems] = useState("");

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { userId, kollectionId, setKollectionId } = useContext(GlobalContext);

  const localId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const details = { name, topic, description, image };
  // console.log(image);

  // Handle form submit
  const handleSubmitCollection = (e, kolledtionId) => {
    e.preventDefault();
    setLoading(true);

    if (form == "create") {
      fetch(
        localId
          ? "https://item-um.herokuapp.com/api/collections/create/" + localId
          : "https://item-um.herokuapp.com/api/collections/create/" + userId,
        {
          method: "POST",
          body: JSON.stringify(details),
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setKollectionId(data.kollection._id);
          setForm(null);
          setKollections([...kollections, data.kollection]);
        })
        .catch((err) => console.log(err));
    } else if (form == "edit") {
      const name = details.name == "" ? active.name : details.name;
      const description =
        details.description == "" ? active.description : details.description;
      const topic = details.topic == "" ? active.topic : details.topic;
      // const image = details.image == "" ? active.image : details.image;

      fetch("https://item-um.herokuapp.com/api/collections/" + kollectionId, {
        method: "PATCH",
        body: JSON.stringify({ ...details, name, description, topic, image }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUpdate(!update);
          setForm(null);
        })
        .catch((err) => console.log(err));
    }
  };

  // Load all of User's collections
  useEffect(() => {
    (localId || userId) &&
      fetch(
        localId
          ? "https://item-um.herokuapp.com/api/collections/user/" + localId
          : "https://item-um.herokuapp.com/api/collections/user/" + userId,
        {
          headers: { "x-access-token": token },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setKollections(result.kollections);
        })
        .catch((err) => console.log(err));
  }, [update]);

  // Handle Select to update each collection
  const handleSelect = (selected, kollectionId) => {
    console.log(kollectionId);
    fetch("https://item-um.herokuapp.com/api/collections/" + kollectionId, {
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

  // Handle delete
  const handleDelete = () => {
    fetch("https://item-um.herokuapp.com/api/collections/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  // Handle edit collection
  const handleEditCollection = (kollectionId) => {
    console.log(kollectionId);
    setActive(kollections.find((kollection) => kollection._id == kollectionId));
    setActiveKollectionId(kollectionId);
    setForm("edit");
  };

  // Collection details
  const handleDetails = (kollectionId) => {
    console.log(kollectionId);
    fetch("http://item-um.herokuapp.com/api/items/" + kollectionId, {
      headers: { "x-access-token": token },
    })
      .then((res) => {
        res.json();
      })
      .then((result) => {
        console.log(result);
        // navigate("/items/" + kollectionId);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateCollection = () => {
    setForm("create");
  };

  const handleCancelForm = () => {
    setForm(null);
  };

  const handleNameChange = (name) => {
    setName(name);
  };
  const handleDescriptionChange = (description) => {
    setDescription(description);
  };
  const handleTopicChange = (topic) => {
    setTopic(topic);
  };

  const handleImageUpload = (files) => {
    setImageSelected(files);
  };

  useEffect(() => {
    if (imageSelected) {
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "ytjjyrko");

      Axios.post(
        "http://api.cloudinary.com/v1_1/meezoh/image/upload",
        formData
      ).then((response) => {
        setImage(response.data.secure_url);
      });
    }
  }, [imageSelected]);

  return (
    <div className="collection">
      <div className="collection-header">
        <h2 className="collection-title">User Collections</h2>
        <div className="toolbar">
          <Button
            variant="primary"
            size="lg"
            active
            onClick={handleCreateCollection}
          >
            New Collection
          </Button>
          <Button onClick={handleDelete} type="button" className="btn btn-dark">
            <MdDeleteOutline size={22} />
          </Button>
        </div>
      </div>

      {/* {openModal && (
        <div className="moda">
          <h1>There are no items </h1>
          <Button className="btn btn-danger" onClick={setOpenModal(false)}>
            close
          </Button>
        </div>
      )} */}

      {form && (
        <CollectioForm
          handleSubmitCollection={handleSubmitCollection}
          handleNameChange={handleNameChange}
          handleDescriptionChange={handleDescriptionChange}
          handleTopicChange={handleTopicChange}
          handleImageUpload={handleImageUpload}
          active={active}
          name={name}
          description={description}
          topic={topic}
          image={image}
          collectionArr={collectionArr}
          activeKollectionId={activeKollectionId}
          loading={loading}
          handleCancelForm={handleCancelForm}
        />
      )}
      <CollectionCard
        kollections={kollections}
        handleSelect={handleSelect}
        handleEditCollection={handleEditCollection}
        kollectionId={kollectionId}
        handleDetails={handleDetails}
      />
    </div>
  );
};

export default Collection;
