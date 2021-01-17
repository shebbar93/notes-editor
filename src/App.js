import './App.css';
// import NotesListData from './Components/NotesListData'
// import NoteDetails from './Components/NoteDetails'
//import { LocationContext } from './Context/LocationContext'
//import { useState, useEffect } from 'react';
import data from './Data/NotesData'
import Child from './Components/Child'
import LocationState from './Context/LocationState'

function App() {
  // const [notesEditor, setNotesEditor] = useState({
  //   selectedId: null,
  //   notesData: JSON.parse(JSON.stringify(data)),
  //   originalItems: data,
  //   undoArray: [],
  //   redoArray: []
  // });

  // const getFromLocalStorage = () => {
  //   if (localStorage.getItem('lists') && notesEditor.selectedId === null) {
  //     setNotesEditor({
  //       ...notesEditor,
  //       notesData: JSON.parse(localStorage.getItem('lists'))
  //     })
  //   }
  // }
  // useEffect(() => {
  //   getFromLocalStorage();
  // }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    // <LocationContext.Provider value={[notesEditor, setNotesEditor]}>
    //   <Child title={data.title} />
    // </LocationContext.Provider>
    <LocationState>
      <Child title={data.title} />
    </LocationState>
  );
}

export default App;
