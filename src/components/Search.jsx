import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Search = ({ searchItems }) => {
  const searchCount = searchItems ? searchItems.length : 0;
  const s = searchItems && searchItems.length > 1 ? "s" : "";

  return (
    <div className="Search">
      {searchItems && (
        <div className="container">
          <header className="search-header">
            <h3>Items Found</h3>
            <p className="items-count">
              {searchCount} Item{s}
            </p>
          </header>

          <article>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
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
