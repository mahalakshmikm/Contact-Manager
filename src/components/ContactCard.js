import React from "react";
import {Link} from "react-router-dom";
import user from "../images/user.png";


const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  return (
    <div className="contact-card">

      <div className="left-section">
        <img src={user} alt="user" />
        <div className="contact-info">
          <Link to={`/contact/${id}`} >
          <div className="header">{name}</div>
          <div>{email}</div>
          </Link>
        </div>
      </div>
      <div className="icons" style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <Link to="/edit" state={{ contact: props.contact }}>
          <i
            className="edit alternate outline icon"
            style={{ color: "blue", cursor: "pointer", fontSize: "20px" }}
          ></i>
        </Link>

        <i
          className="trash alternate outline icon"
          style={{ color: "red", cursor: "pointer", fontSize: "20px" }}
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to delete this contact?")) {
              props.clickHandler(id);
            }
          }}
        ></i>
      </div>
    </div>

  );
};

export default ContactCard;
