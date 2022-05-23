import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext, useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";

const NavBar = () => {
  const userId = localStorage.getItem("userId");

  const {
    signIn,
    setSignIn,
    signOut,
    setSignOut,
    showCollection,
    setShowCollection,
  } = useContext(GlobalContext);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    if (userId) {
      setSignIn(false);
      setSignOut(true);
      setShowCollection(true);
    }
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Item Collection App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/admin">Admin Panel</Nav.Link>
              {signIn && <Nav.Link href="/login">Sign in</Nav.Link>}
              {showCollection && (
                <Nav.Link href={"/collections/" + userId}>Collections</Nav.Link>
              )}
            </Nav>
            {signOut && (
              <Button
                className="signout"
                variant="secondary"
                size="md"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            )}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
