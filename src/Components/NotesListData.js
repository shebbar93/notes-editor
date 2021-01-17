import React, { useContext } from 'react'
import Preview from './PreviewNote'
import { LocationContext } from '../Context/LocationContext';

const NotesListData = () => {
    //const [notesEditor] = useLocation()
    const locationContext = useContext(LocationContext)
    const { notesData } = locationContext

    const notes = notesData ? notesData.items.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) : [];
    return (
        notes.length > 0 && (<ul className="notes-list">
            {notes.map((note) => (
                <li key={note.id}>
                    <Preview note={note} />
                </li>
            ))}
        </ul>)
    )
}

export default NotesListData
