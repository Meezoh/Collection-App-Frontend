import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const ItemForm = (props) => {
  const {
    handleSubmitCollection,
    handleNameChange,
    handleTagChange,
    handleImageUpload,
    active,
    itemName,
    itemTag,
    itemImage,
    activeItemId,
    loading,
    handleCancelForm,
  } = props;

  return (
    <div>
      <Form
        className="add-collection "
        onSubmit={(e) => handleSubmitCollection(e, activeItemId)}
      >
        <Col>
          <Form.Control
            className="name"
            placeholder="Name your collection"
            onChange={(e) => handleNameChange(e.target.value)}
            required
            value={active && !itemName ? active.itemName : itemName}
          />
        </Col>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col sm={13}>
            <Form.Control
              rows={3}
              type="text"
              placeholder="Tag"
              value={active && !itemTag ? active.itemTag : itemTag}
              required
              onChange={(e) => handleTagChange(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={13}>
            <Form.Control
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              // value={active && !image ? active.image : image}
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
    </div>
  );
};

export default ItemForm;
