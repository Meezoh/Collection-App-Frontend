import collectionArr from "../util/collectionTopics";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import GlobalContext from "../contexts/GlobalContext";
import CollectioForm from "./CollectionForm";
import CollectionList from "../components/CollectionList";
import Table from "react-bootstrap/Table";

const Collection = () => {
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);
  const [kollections, setKollections] = useState([]);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(null);
  const [activeKollectionId, setActiveKollectionId] = useState(null);

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { userId, kollectionId, setKollectionId, kollection, setKollection } =
    useContext(GlobalContext);

  const localId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) navigate("/login");

    // localId(localStorage.getItem("userId"));
  }, []);

  const details = { name, topic, description, image };

  // Handle form submit
  const handleSubmitCollection = (e, id) => {
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
          console.log(data);
          setLoading(false);
          setKollectionId(data.kollection._id);
          setForm(null);
          setKollections([...kollections, data.kollection]);
          console.log(kollections);
          // [...kollections, data.newkollection];
        })
        .catch((err) => console.log(err));
    } else if (form == "edit") {
      const name = details.name == "" ? active.name : details.name;
      const description =
        details.description == "" ? active.description : details.description;
      const topic = details.topic == "" ? active.topic : details.topic;
      const image = details.image == "" ? active.image : details.image;

      fetch("https://item-um.herokuapp.com/api/collections/" + id, {
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
    fetch(
      localId
        ? "https://item-um.herokuapp.com/api/collections/user/" + localId
        : "https://item-um.herokuapp.com/api/collections/user/" + userId,
      {
        headers: { "x-access-token": token },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setKollections(data.kollections);
      })
      .catch((err) => console.log(err));
  }, [update]);

  // Handle Select to update each collection
  const handleSelect = (selected, id) => {
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
  const handleEditCollection = (id) => {
    setActive(kollections.find((kollection) => kollection._id == id));
    setActiveKollectionId(id);
    setForm("edit");
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
  const handleImageChange = (image) => {
    setImage(image);
  };

  return (
    <div className="collection">
      <h1>User Collections</h1>

      <>
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
      </>

      {form && (
        <CollectioForm
          handleSubmitCollection={handleSubmitCollection}
          handleNameChange={handleNameChange}
          handleDescriptionChange={handleDescriptionChange}
          handleTopicChange={handleTopicChange}
          handleImageChange={handleImageChange}
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

      <Table className="table" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Select</th>
            <th>id</th>
            <th>Name</th>
            <th>Topic</th>
            <th>Description</th>
            <th>Image</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {kollections.map((kollection, i) => {
            const { name, topic, description, image, selected, _id } =
              kollection;
            let num = i + 1;

            return (
              <CollectionList
                key={i}
                num={num}
                name={name}
                topic={topic}
                description={description}
                image={image}
                selected={selected}
                id={_id}
                handleSelect={handleSelect}
                handleEditCollection={handleEditCollection}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Collection;
