import { useNavigate } from "react-router";
import { useEffect } from "react";

const ALogin = ({ userId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId);
    if (userId != null) navigate("/collections");
  }, [userId]);

  return <div className="ALogin"></div>;
};

export default ALogin;
