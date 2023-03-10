import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import View from "./reactfiles/View"
import Edit from "./reactfiles/Edit"

function App() {
  const notes = [
    { id: 1, title: "Note 1", content: "This is the first note" },
    { id: 2, title: "Note 2", content: "This is the second note" },
    { id: 3, title: "Note 3", content: "This is the third note" }
  ];
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"></Route>
          <Route path="/notes" element={<div className="no-note-selected">Select a note, or create a new one.</div>}></Route>
          <Route path="/notes/:noteID" element={<View notes={notes} />}></Route>
          <Route path="/notes/:noteID/edit" element={<Edit notes={notes} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;