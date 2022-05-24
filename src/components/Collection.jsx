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
  const [detailsKollectionId, setDetailsKollectionId] = useState(null);

  const navigate = useNavigate();
  const { userId, kollectionId, setKollectionId, kollection, setKollection } =
    useContext(GlobalContext);
  const token = localStorage.getItem("authToken");
  const localId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const details = { name, topic, description, image };

  useEffect(() => {
    if (!token) navigate("/");
  }, []);

  const handleSubmitCollection = (e) => {
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
          setKollections([data.kollection, ...kollections]);
        })
        .catch((err) => console.log(err));
    } else if (form == "edit") {
      const name = details.name == "" ? active.name : details.name;
      const description =
        details.description == "" ? active.description : details.description;
      const topic = details.topic == "" ? active.topic : details.topic;

      fetch(
        "https://item-um.herokuapp.com/api/collections/" + activeKollectionId,
        {
          method: "PATCH",
          body: JSON.stringify({ ...details, name, description, topic, image }),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setUpdate(!update);
          setForm(null);
        })
        .catch((err) => console.log(err));
    }
  };

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

  const handleSelect = (selected, kollectionId) => {
    console.log(selected, kollectionId);
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

  const handleDelete = () => {
    console.log(kollectionId);
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

  const handleEditCollection = (kollectionId) => {
    console.log(kollectionId);
    setActive(kollections.find((kollection) => kollection._id == kollectionId));
    setActiveKollectionId(kollectionId);
    setForm("edit");
  };

  const handleDetails = (id) => {
    setDetailsKollectionId(id);
    fetch("http://item-um.herokuapp.com/api/collections/" + id, {
      headers: { "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setKollection(result.kollection);
        localStorage.setItem("kollection", JSON.stringify(result.kollection));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (detailsKollectionId) navigate("/items/" + detailsKollectionId);
  }, [kollection]);

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
        <h2 className="collection-title">{userName} Collections</h2>
        <div className="toolbar">
          <Button
            variant="primary"
            size="lg"
            active
            onClick={handleCreateCollection}
          >
            New Collection
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
