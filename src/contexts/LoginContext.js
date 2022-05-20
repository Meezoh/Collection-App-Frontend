// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import { useEffect, useState, createContext } from "react";
// import Alert from "react-bootstrap/Alert";
// import { Link } from "react-router-dom";

// const LoginContext = createContext();

// export function LoginProvider({ children }) {
//   const [userId, setUserId] = useState(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);

//   const details = { email, password };

//   const handleSignin = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     fetch("https://item-um.herokuapp.com/api/login", {
//       method: "POST",
//       redirect: "manual",
//       body: JSON.stringify(details),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setLoading(false);
//         setUserId(result.user._id);
//         if (result.msg) {
//           setError(result.msg);
//           setShow(true);
//         } else if (result.user.status == false) {
//           setError("You have been blocked!!");
//           setShow(true);
//         } else {
//           const token = result.user.token;
//           localStorage.setItem("authToken", token);
//           localStorage.setItem("email", email);
//         }
//       })
//       .catch((err) => setLoading(false));
//   };

//   return (
//     <div className="Login">
//       <h1 className="title"></h1>
//       {show && (
//         <Alert variant="danger" onClose={() => setShow(false)} dismissible>
//           <Alert.Heading>{error}</Alert.Heading>
//         </Alert>
//       )}
//       <h4 className="sign-header">Sign into your account</h4>

//       <Form onSubmit={handleSignin}>
//         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//           <Col sm={13}>
//             <Form.Control
//               type="email"
//               placeholder="Email"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Col>
//         </Form.Group>

//         <Form.Group
//           as={Row}
//           className="mb-3"
//           controlId="formHorizontalPassword"
//         >
//           <Col sm={13}>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               required
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Col>
//         </Form.Group>

//         <Form.Group as={Row} className="mb-3">
//           <Col>
//             <Button disabled={loading ? true : false} type="submit">
//               {loading ? "Loading..." : "Sign in"}
//             </Button>
//           </Col>
//         </Form.Group>
//       </Form>

//       <p className="register-here">
//         Don't have an account? <Link to="/signup">Register here</Link>
//       </p>

//       <LoginContext.Provider value={userId}>{children}</LoginContext.Provider>
//     </div>
//   );
// }

// export default LoginContext;