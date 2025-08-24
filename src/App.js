import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" },
  ]);

  const setTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return alert("Please provide a valid title");
    }

    const newNote = {
      id: Date.now() + "",
      title: title,
    };

    setNotes([newNote, ...notes]);
    setTitle(""); 
  };

  const removeHandler = (noteId) => {
    const updatedNotes = notes.filter((item) => item.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label htmlFor="addNote">Add Note: </label>
        <input
          type="text"
          name="addNote"
          id="addNote"
          value={title}
          onChange={setTitleHandler}
        />
        <button type="submit">Add Note</button>
      </form>

      
      <div className="note-list">
        <h2>All notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.title}</span>
              <button>Edit</button>
              <button onClick={() => removeHandler(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
