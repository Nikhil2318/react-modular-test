import { useState } from "react";
import ColorPicker from "./ColorPicker";
import "./modal.css";

function Modal({ addGroup }) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(null);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleSubmit = () => {
    if (name === "") {
      alert("Please enter a group name");
    } else if (color === null) {
      alert("Please select a color");
    } else {
      console.log("Group Name:", name);
      console.log("Selected Color:", color);
      // You can add the group to the state here if needed
      // addGroup(name, color);
      setName("");
      addGroup(name, color);
      setColor(null);
      closeModal();
    }
  };

  return (
    <>
      <button className="btn-modal" onClick={openModal}>
        <span className="plus">+ Create Notes group</span>
      </button>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Create New Notes Group</h2>
              <label>Group Name</label>
              <input
                type="text"
                id="group_input"
                placeholder="Enter your group name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <ColorPicker setColor={setColor} />
              <button className="close-modal" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
