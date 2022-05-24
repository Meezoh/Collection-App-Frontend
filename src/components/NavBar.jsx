import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useContext, useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";
import { useNavigate } from "react-router";

const NavBar = () => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const {
    signIn,
    setSignIn,
    signOut,
    setSignOut,
    showCollection,
    setShowCollection,
    showAdmin,
    setShowAdmin,
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
      role == "admin" && setShowAdmin(true);
    }
  }, []);

  const handleSearch = (term) => {
    fetch("http://item-um.herokuapp.com/api/allItems/search/" + term)
      .then((res) => res.json())
      .then((result) => {})
      .catch((err) => console.log(err));
  };

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
              {showAdmin && (
                <Nav.Link href={"/admin/" + userId}>Admin Panel</Nav.Link>
              )}
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
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
