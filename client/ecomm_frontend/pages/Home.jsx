import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  // if (!localStorage.getItem("token")) {
  //   navigate("/");
  // }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <Link to="/admin">Go to Admin Dashboard</Link>
      <Link to="/products">View Products</Link>
    </div>
  );
};

export default Home;
