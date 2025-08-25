import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [editmode,setEditMode]= useState(false);

  const [editableNote,setEditableNote]=useState(null);

  const setEditModeHandler= (note) =>{
        setEditMode(true);
        setEditableNote(note);
        setTitle(note.title);
  }
const updateHandler=()=>{
  const updatedNotes =notes.map(item =>{
      if (item.id === editableNote.id) {
        return {...item, title : title}
      }
      return item;
  });
  setNotes(updatedNotes);
  setEditMode(false);
  setTitle("");
}
  const setTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return alert("Please provide a valid title");
    }
      editmode ? updateHandler() : createHandler();
  };
const createHandler=()=>{
  const newNote = {
      id: Date.now() + "",
      title: title,
    };

    setNotes([newNote, ...notes]);
    setTitle(""); 
}
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
        <button type="submit">{editmode ? "Update Note":"Add Note"}</button>
      </form>

      
      <div className="note-list">
        <h2>All notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.title}</span>
              <button onClick={()=>setEditModeHandler(note)}>Edit</button>
              <button onClick={() => removeHandler(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
