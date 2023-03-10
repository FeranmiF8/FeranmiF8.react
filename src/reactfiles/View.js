import React from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

export default function View() {
  const id = useParams().noteID;
  var [notes, setNotes] = useOutletContext();
  const navigate = useNavigate();
  var cursor;

  for (var note in notes) {
    if (notes[note].id === id) {
      cursor = notes[note];
    }
  }
  function handleDelete() {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      notes = notes.filter((note) => note.id !== id);
      setNotes(notes);
      navigate("/notes/");
    }
  }

  return (
    <div id="Note">
      <div className="note-info">
        <div className="title-date">
          <h2>{cursor.title}</h2>
          <small>{cursor.date}</small>
        </div>
        <div>
          <label className="button-for-note" onClick={() => navigate("edit")}>
            Edit
          </label>
          <label className="button-for-note" onClick={handleDelete}>
            Delete
          </label>
        </div>
      </div>
      <div
        className="view-text"
        dangerouslySetInnerHTML={{ __html: cursor.text }}
      ></div>
    </div>
  );
}