import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const ContactForm = ({ newContact, onInputChange, onAddContact }) => (
  <div className="mt-4">
    <h2 className="text-xl font-semibold"> Add Contact</h2>
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={newContact.name}
        onChange={onInputChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Phone Number"
        name="phoneNumber"
        value={newContact.phoneNumber}
        onChange={onInputChange}
        className="p-2 border rounded ml-2"
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={newContact.email}
        onChange={onInputChange}
        className="p-2 border rounded ml-2"
      />
      <button
        onClick={onAddContact}
        className="bg-blue-500 flex gap-4 text-white p-2 rounded ml-2"
      >
        <FaPlusCircle />
      </button>
    </div>
  </div>
);

export default ContactForm;
