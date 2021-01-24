import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

function Header(props) {
  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Streamer
        </Link>

        <div class="right menu">
          <Link to="/" className="item">
            All Streams
          </Link>
          
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
}

export default Header;
