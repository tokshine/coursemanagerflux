import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Pluaral Sight</h1>
      <p> React,Flux and React Router for ultra-resonsive web apps</p>
      {/* <a href='/about'>Goto About Us</a> */}
      {/* React link approach */}
      <Link to="about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
}

export default HomePage;
