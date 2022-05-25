import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

const ItemCard = (props) => {
  const { items, handleSelect, handleEditItem, itemId, handleDetails } = props;
  const token = localStorage.getItem("authToken");

  // Change selected to false
  useEffect(() => {
    if (itemId) {
      fetch("https://item-um.herokuapp.com/api/items/" + itemId, {
        method: "PATCH",
        body: JSON.stringify({ selected: false }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((res) => res.json())
        .then((result) => null)
        .catch((err) => console.log(err));
    }
  }, [itemId]);

  return (
    <div>
      {items && (
        <div className="items">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {items.map((item, i) => {
              const { name, tag, image, selected, _id: itemId } = item;
              return (
                <Col key={i}>
                  <Card className="card">
                    <Card.Img variant="top" src={image} />
                    <div className="check-view">
                      <Form.Check
                        type="checkbox"
                        onClick={() => handleSelect(selected, itemId)}
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        active
                        onClick={() => handleEditItem(itemId)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        active
                        // onClick={() => handleDetails(itemId)}
                      >
                        Details
                      </Button>
                    </div>
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <ul>
                        {tag.length > 1
                          ? tag.map((t, i) => {
                              return <li key={i}>{t} </li>;
                            })
                          : tag}
                      </ul>
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
  );
};

export default ItemCard;
