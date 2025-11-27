import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { v4 as uuidv4 } from "uuid";
import EditContact from "./EditContact";
import api from "../api/api";

function App() {
  
  const [contacts, setContacts]= useState([]);
  const addContactHandler = async (contact) => {
  const request = {
    id: uuidv4(),
    ...contact
  };
  const response = await api.post("/contacts", request);
  setContacts([...contacts, response.data]);
};


  const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`, contact);

  setContacts(
    contacts.map((c) => {
      return c.id === response.data.id ? response.data : c;
    })
  );
};

  const removeContactHandler = async (id) => {
  await api.delete(`/contacts/${id}`);

  const newContactList = contacts.filter((contact) => {
    return contact.id !== id;
  });

  setContacts(newContactList);
};

  useEffect(() => {
  const getAllContacts = async () => {
    const response = await api.get("/contacts");
    setContacts(response.data);
  };

  getAllContacts();
}, []);


  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />

          <Route
            path="/"
            element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}
          />

          <Route
            path="/edit"
            element={<EditContact updateContactHandler={updateContactHandler} />}
          />
          </Routes>
      </div>
      
    </Router>
  );
}

export default App;
  
