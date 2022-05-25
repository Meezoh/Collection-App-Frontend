import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

const Search = ({ searchItems }) => {
  // const { name, image, tag,  } = searchItems;

  const searchCount = searchItems ? searchItems.length : 0;

  return (
    <div className="Search">
      {searchItems && (
        <div className="container">
          <header>
            <h3>Products Found</h3>
            <p className="items-count">{searchCount} Products</p>
          </header>

          <article>
            <Row xs={1} md={2} lg={3} className="g-4">
              {searchItems.map((item, i) => {
                const { name, tag, image, _id: itemId } = item;
                return (
                  <Col key={i}>
                    <Card className="card">
                      <Card.Img variant="top" src={image} />
                      <Button
                        className="check-view"
                        variant="primary"
                        size="md"
                        active
                        // onClick={() => handleDetails(itemId)}
                      >
                        Details
                      </Button>
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
          </article>
        </div>
      )}
    </div>
  );
};

export default Search;
