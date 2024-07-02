/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import send from "./Vector.png";
// import Note from "./Note";

function TaskContent({ group }) {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState({});

  // Function to format the current date and time
  const formattedDateTime = () => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMin = String(minutes).padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMin} ${period}`; // Use backticks for template literals

    const day = time.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[time.getMonth()];
    const year = time.getFullYear();
    const formattedDate = `${day} ${month} ${year}`; // Use backticks for template literals

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  const addNote = () => {
    if (content.trim() === "") return;
    const { date, time } = formattedDateTime(); // Destructure correctly
    setNotes((prevNotes) => ({
      ...prevNotes,
      [group.name]: [...(prevNotes[group.name] || []), { content, date, time }],
    }));
    setContent("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addNote();
    }
  };

  return (
    <div
      className="task-content"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70vw",
        height: "100%",
        backgroundColor: "#F7ECDC",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "13px 20px 10px",
          backgroundColor: "#E8E8E8",
          position: "sticky",
          top: "0",
          zIndex: "2",
        }}
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
            marginRight: "10px",
          }}
        >
          <span style={{ fontSize: "22px" }}>
            {group.name
              .split(" ")
              .map((word) => word[0].toUpperCase())
              .join("")}
          </span>
        </div>
        <span
          style={{
            fontSize: "18px",
            fontWeight: "600",
            paddingLeft: "20px",
          }}
        >
          {group.name}
        </span>
      </div>
      <div
        style={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto", // Ensure scrolling is enabled
          paddingBottom: "205px",
        }}
      >
        {(notes[group.name] || []).map((note, index) => (
          <div
            key={index}
            style={{
              margin: "20px 33px 0",
              backgroundColor: "#F7ECDC",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <p
                style={{
                  marginTop: "-10px",
                }}
              >
                {note.time}
              </p>
              <p>{note.date}</p>
            </div>
            <p
              style={{
                paddingLeft: "25px",
                width: "80%",
                Height: "100px",
                marginBottom: "10px", // Remove default margin to avoid layout issues
              }}
            >
              {note.content}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E8E8E8",
          position: "fixed",
          bottom: "0",
          width: "70vw",
        }}
      >
        <textarea
          placeholder="Enter your text here..........."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
          style={{
            width: "95%",
            height: "140px",
            margin: "20px",
            padding: "10px",
            resize: "none",
            fontSize: "14px",
            border: "none",
            borderRadius: "6px",
            boxSizing: "border-box",
          }}
        ></textarea>
        <div
          className="send"
          onClick={addNote}
          style={{
            position: "absolute",
            right: "35px",
            bottom: "27px",
            cursor: "pointer",
          }}
        >
          <img
            src={send}
            alt="send_img"
            style={{
              width: "23px",
              height: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskContent;
