import React from 'react'
import Preview from './PreviewNote'
import { useLocation } from '../Context/LocationContext';

const NotesListData = () => {
    const [notesEditor] = useLocation()
    const notes = notesEditor.notesData.items.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
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
