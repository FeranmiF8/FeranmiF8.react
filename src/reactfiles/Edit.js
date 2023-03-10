import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Edit() {
  const id = useParams().noteID;
  var [notes, setNotes] = useOutletContext();
  const LOCAL_STORAGE_KEY = "notesApp.notes";
  const navigate = useNavigate();
  const d = new Date();
  var cursor;
  const [date, setDate] = useState(() => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19));
  
  const module = {
    tools: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  for (var i in notes) {
    if (notes[i].id === id) {
      cursor = notes[i];
    }
  }

  const [value, setValue] = useState(() => cursor.text);
  const [title, setTitle] = useState(() => cursor.title);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  function handleDelete() {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      notes = notes.filter((note) => note.id !== id);
      navigate("/notes/");
    }
  }

  function handleSave() {
    cursor.date = formatDate(date);
    cursor.text = value;
    cursor.title = title;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    navigate("/notes/" + id);
  }

  return (
    <div id="Note">
      <div className="note-info">
        <div className="title-date">
          <input
            type="text"
            className="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="editDate"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="button-for-note" onClick={handleSave}>
            Save
          </label>
          <label className="button-for-note" onClick={handleDelete}>
            Delete
          </label>
        </div>
      </div>
      <ReactQuill
        className="edit-section"
        module={module}
        theme="snow"
        placeholder="Your Note Here"
        value={value !== "..." ? value : ""}
        onChange={setValue}
      />
    </div>
  );
}