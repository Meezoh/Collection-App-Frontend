import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";

const CollectionCard = (props) => {
  const {
    kollections,
    handleSelect,
    handleEditCollection,
    kollectionId,
    handleDetails,
  } = props;
  const token = localStorage.getItem("authToken");

  // Change selected to false
  useEffect(() => {
    if (kollectionId) {
      fetch("https://item-um.herokuapp.com/api/collections/" + kollectionId, {
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
  }, [kollectionId]);

  // console.log(kollections);
  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        {kollections.map((kollection, i) => {
          const {
            name,
            topic,
            description,
            image,
            selected,
            _id: kollectionId,
          } = kollection;
          return (
            <Col key={i}>
              <Card className="card">
                {/* <Card.Header>Header</Card.Header> */}
                <Card.Img variant="top" src={image} />
                <div className="check-view">
                  <Form.Check
                    type="checkbox"
                    onClick={() => handleSelect(selected, kollectionId)}
                  />
                  {/* <Button
                    variant="secondary"
                    size="lg"
                    active
                    onClick={() => handleEditCollection(kollectionId)}
                  >
                    Edit
                  </Button> */}
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
                  <Card.Text>
                    {/* <ReactMarkdown children={description} /> */}
                    {description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default CollectionCard;
