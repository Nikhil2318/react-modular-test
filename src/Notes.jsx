// import React from 'react'
import "./Notes.css";
import Modal from "./Modal";
import notesImg from "./notes.png";
import lockImg from "./lock.png";
import { useEffect, useState } from "react";
import TaskContent from "./TaskContent";
function Notes() {
  const [groups, setGroups] = useState([]);
  const addGroup = (name, color) => {
    const isExisting = groups.some((group) => group.name === name);
    if (!isExisting) {
      setGroups([...groups, { name, color }]);
    } else {
      alert("Group already exists");
    }
  };
  const groupInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setSelectedGroup((prevGroup) => (prevGroup ? null : selectedGroup));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Modern browsers require returnValue to be set
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };
  return (
    <>
      <div className="main">
        <div className="group-list">
          <div className="group-header">
            <h2 style={{ paddingLeft: "20px" }}>Pocket Notes</h2>
            <Modal addGroup={addGroup} />
          </div>
          <div className="group-list">
            {groups.map((group, index) => (
              <div
                className={`group ${selectedGroup === group ? "selected" : ""}`}
                key={index}
                onClick={() => handleGroupSelection(group)}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: group.color,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#FFF",
                    fontSize: "22px",
                  }}
                >
                  {groupInitials(group.name)}
                </div>
                <span
                  style={{
                    padding: "0 20px",
                  }}
                >
                  {group.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="group-content"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {selectedGroup ? (
            <TaskContent group={selectedGroup} />
          ) : (
            <>
              <div
                className="img"
                style={{
                  width: "500px",
                  height: "300px",
                  marginRight: "90px",
                  marginTop: "120px",
                }}
              >
                <img src={notesImg} alt="notes_img" />
              </div>
              <p
                style={{
                  fontSize: "48px",
                  marginTop: "-10px",
                }}
              >
                Pocket Notes
              </p>
              <div
                style={{
                  width: "500px",
                  height: "300px",
                  marginTop: "-60px",
                  marginLeft: "55px",
                }}
              >
                <p>
                  Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>

              <div
                className="footer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={lockImg}
                  alt="lock_img"
                  style={{
                    margin: "19px 7px",
                    width: "15px",
                    height: "15px",
                  }}
                />
                <p style={{ color: "#292929" }}>end-to-end encrypted</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Notes;
