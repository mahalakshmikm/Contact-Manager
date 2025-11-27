import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const EditContact = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name: initialName, email: initialEmail } = location.state.contact;

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const update = (e) => {
    e.preventDefault();

    if (name === "" || email === "") {
      alert("All fields are mandatory!");
      return;
    }

    props.updateContactHandler({ id, name, email });


    setName("");
    setEmail("");

    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input 
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="mybtn ui button">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
