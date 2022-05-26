import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const ItemForm = (props) => {
  const {
    removeTags,
    addTags,
    handleSubmitItem,
    handleNameChange,
    handleImageUpload,
    active,
    name,
    tag,
    image,
    activeItemId,
    loading,
    handleCancelForm,
    imageUploading,
  } = props;

  let buttonMode = "";
  if (loading) buttonMode = "Loading...";
  else if (imageUploading) buttonMode = "Image Uploading...";
  else buttonMode = "Submit";

  return (
    <div>
      <Form
        className="add-collection "
        onSubmit={(e) => handleSubmitItem(e, activeItemId)}
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <Col>
          <Form.Control
            className="name"
            placeholder="Name your item"
            onChange={(e) => handleNameChange(e.target.value)}
            required
            value={active && !name ? active.name : name}
          />
        </Col>

        <div className="tags-input">
          <ul className="tags">
            {tag.map((tag, index) => (
              <li key={index} className="tag">
                <span className="tag-title">{tag}</span>
                <span
                  className="tag-close-icon"
                  onClick={() => removeTags(index)}
                >
                  x
                </span>
              </li>
            ))}
          </ul>

          <Form.Group as={Row} className="mb-3">
            <Col sm={13}>
              <Form.Control
                rows={3}
                type="text"
                placeholder="Press enter to add tags"
                onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
              />
            </Col>
          </Form.Group>
        </div>

        <Form.Group as={Row} className="mb-3">
          <Col sm={13}>
            <Form.Control
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </Col>
        </Form.Group>

        <Button
          disabled={loading || imageUploading ? true : false}
          type="submit"
        >
          {buttonMode}
        </Button>
        <Button className="btn btn-danger" onClick={handleCancelForm}>
          Close
        </Button>
      </Form>
    </div>
  );
};

export default ItemForm;
