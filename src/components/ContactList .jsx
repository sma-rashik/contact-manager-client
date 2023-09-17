import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ContactList = ({ filteredContacts, onEditClick, onDeleteClick }) => (
  <div className="mt-4">
    <h2 className="text-xl font-semibold">Contacts</h2>
    <ul className="mt-4">
      {filteredContacts.map((contact) => (
        <li
          key={contact._id}
          className="mb-4 p-4 bg-white rounded-lg shadow-md flex items-center justify-between"
        >
          <div>
            <p className="text-lg font-semibold">{contact.name}</p>
            <p className="text-gray-600">{contact.phoneNumber}</p>
            <p className="text-gray-600">{contact.email}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEditClick(contact)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDeleteClick(contact._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300"
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ContactList;
