import './App.css';
import NotesListData from './Components/NotesListData'
import NoteDetails from './Components/NoteDetails'
import { LocationContext } from './Context/LocationContext'
import { useState, useEffect } from 'react';
import data from './Data/NotesData'

function App() {
  const [notesEditor, setNotesEditor] = useState({
    selectedId: null,
    notesData: JSON.parse(JSON.stringify(data)),
    originalItems: data,
    undoArray: [],
    redoArray: []
  });

  const getFromLocalStorage = () => {
    if (localStorage.getItem('lists') && notesEditor.selectedId === null) {
      setNotesEditor({
        ...notesEditor,
        notesData: JSON.parse(localStorage.getItem('lists'))
      })
    }
  }
  useEffect(() => {
    getFromLocalStorage();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <LocationContext.Provider value={[notesEditor, setNotesEditor]}>
      <div className="main">
        <section className="col sidebar">
          <section className="sidebar-header">
            <img
              className="logo"
              src="notes.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>{data.title}</strong>
          </section>
          <nav>
            <NotesListData />
          </nav>
        </section>
        <section className="col note-viewer">
          <NoteDetails selectedId={notesEditor.selectedId} notesData={notesEditor.notesData} />
        </section>
      </div>
    </LocationContext.Provider>
  );
}

export default App;
