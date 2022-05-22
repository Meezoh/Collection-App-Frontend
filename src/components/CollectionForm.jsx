import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const CollectioForm = (props) => {
  const {
    handleSubmitCollection,
    handleNameChange,
    handleDescriptionChange,
    handleTopicChange,
    handleImageChange,
    active,
    name,
    description,
    topic,
    image,
    collectionArr,
    activeKollectionId,
    loading,
    handleCancelForm,
  } = props;
  return (
    <Form
      className="add-collection "
      onSubmit={(e) => handleSubmitCollection(e, activeKollectionId)}
    >
      <Col>
        <Form.Control
          className="name"
          placeholder="Name your collection"
          onChange={(e) => handleNameChange(e.target.value)}
          required
          value={active && !name ? active.name : name}
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
            value={active && !description ? active.description : description}
            required
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Select
        className="select-collection"
        aria-label="Default select example"
        onChange={(e) => handleTopicChange(e.target.value)}
        value={active && !topic ? active.topic : topic}
      >
        <option>Select a topic</option>
        {collectionArr.map((collection, i) => {
          return <option key={i}>{collection}</option>;
        })}
      </Form.Select>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Col sm={13}>
          <Form.Control
            type="file"
            placeholder="Image"
            onChange={(e) => handleImageChange(e.target.value)}
            value={image}
          />
        </Col>
      </Form.Group>

      <Button disabled={loading ? true : false} type="submit">
        {loading ? "Loading..." : "Submit"}
      </Button>
      <Button className="btn btn-danger" onClick={handleCancelForm}>
        Close
      </Button>
    </Form>
  );
};

export default CollectioForm;
