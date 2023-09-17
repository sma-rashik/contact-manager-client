import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2"; // Import SweetAlert
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList ";
import EditContactModal from "./components/EditContactModal ";
import SearchAndSort from "./components/SearchAndSort ";
import DownloadContactsButton from "./components/DownloadContactsButton ";

Modal.setAppElement("#root");

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [editingContact, setEditingContact] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    axios
      .get("https://mern-contact-management-server.vercel.app/contacts")
      .then((response) => {
        setContacts(response.data);
        setFilteredContacts(response.data);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phoneNumber || !newContact.email) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    axios
      .post(
        "https://mern-contact-management-server.vercel.app/contacts",
        newContact
      )
      .then((response) => {
        setContacts([...contacts, response.data]);
        setFilteredContacts([...filteredContacts, response.data]);
        setNewContact({
          name: "",
          phoneNumber: "",
          email: "",
        });

        Swal.fire({
          title: "Success!",
          text: "Contact added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("An error occurred while adding the contact:", error);
      });
  };

  const handleEditClick = (contact) => {
    setEditingContact(contact);
    setModalIsOpen(true);
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `https://mern-contact-management-server.vercel.app/contacts/${editingContact._id}`,
        editingContact
      )
      .then((response) => {
        if (response.status === 200) {
          const updatedContact = response.data;
          const updatedContacts = contacts.map((contact) =>
            contact._id === updatedContact._id ? updatedContact : contact
          );
          setContacts(updatedContacts);
          setFilteredContacts(updatedContacts);
          setEditingContact(null);
          setModalIsOpen(false);
        } else {
          console.error(
            "Server returned an unexpected status code:",
            response.status
          );
          console.error("Response data:", response.data);
        }
      })
      .catch((error) => {
        console.error("An error occurred while saving the edit:", error);
      });
  };

  const handleDeleteClick = (contactId) => {
    axios
      .delete(
        `https://mern-contact-management-server.vercel.app/contacts/${contactId}`
      )
      .then((response) => {
        const updatedContacts = contacts.filter(
          (contact) => contact._id !== contactId
        );
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
      });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.phoneNumber.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sorted = [...filteredContacts].sort((a, b) => {
      if (option === "name") {
        return a.name.localeCompare(b.name);
      } else if (option === "phoneNumber") {
        return a.phoneNumber.localeCompare(b.phoneNumber);
      } else if (option === "email") {
        return a.email.localeCompare(b.email);
      }
    });
    setFilteredContacts(sorted);
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-semibold text-center underline">
        Contact Manager- by Rashik
      </h1>

      <ContactForm
        newContact={newContact}
        onInputChange={handleInputChange}
        onAddContact={handleAddContact}
      />

      <SearchAndSort
        searchQuery={searchQuery}
        sortOption={sortOption}
        onSearch={handleSearch}
        onSort={handleSort}
      />

      <ContactList
        filteredContacts={filteredContacts}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <EditContactModal
        modalIsOpen={modalIsOpen}
        editingContact={editingContact}
        onModalClose={() => setModalIsOpen(false)}
        onSaveEdit={handleSaveEdit}
        onEditInputChange={(field, value) =>
          setEditingContact({
            ...editingContact,
            [field]: value,
          })
        }
      />
      <DownloadContactsButton contacts={contacts} />
    </div>
  );
};

export default App;
