import React from "react";
import Modal from "react-modal";
import { FaSave, FaTimes } from "react-icons/fa";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "400px",
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
};
const EditContactModal = ({
  modalIsOpen,
  editingContact,
  onModalClose,
  onSaveEdit,
  onEditInputChange,
}) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onModalClose}
    style={customStyles}
    contentLabel="Edit Contact Modal"
  >
    <h2 className="text-xl font-semibold">Edit Contact</h2>
    <div className="mt-4">
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={editingContact ? editingContact.name : ""}
        onChange={(e) => onEditInputChange("name", e.target.value)}
        className="p-2 border rounded w-full"
      />

      <input
        type="text"
        placeholder="Phone Number"
        name="phoneNumber"
        value={editingContact ? editingContact.phoneNumber : ""}
        onChange={(e) => onEditInputChange("phoneNumber", e.target.value)}
        className="p-2 border rounded mt-2 w-full"
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={editingContact ? editingContact.email : ""}
        onChange={(e) => onEditInputChange("email", e.target.value)}
        className="p-2 border rounded mt-2 w-full"
      />
      <div className="mt-4">
        <button
          onClick={onSaveEdit}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          <FaSave /> Save
        </button>
        <button
          onClick={onModalClose}
          className="bg-gray-500 text-white p-2 rounded"
        >
          <FaTimes /> Cancel
        </button>
      </div>
    </div>
  </Modal>
);

export default EditContactModal;
