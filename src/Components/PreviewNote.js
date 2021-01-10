import React from 'react'
import { useLocation } from '../Context/LocationContext'

const PreviewNote = ({ note }) => {

    const id = note.id;
    const [notesEditor, setNotesEditor] = useLocation()
    const isActive = id === notesEditor.selectedId;

    const clickHandler = () => {
        if (notesEditor.undoArray.length || notesEditor.redoArray.length) {
            if (window.confirm('Unsaved changes including Undo/Redo history will be cleared for this note.')) {
                if (localStorage.getItem('lists')) {
                    setNotesEditor({
                        ...notesEditor,
                        selectedId: id,
                        notesData: JSON.parse(localStorage.getItem('lists')),
                        undoArray: [],
                        redoArray: []
                    })
                } else {
                    setNotesEditor({
                        ...notesEditor,
                        notesData: JSON.parse(JSON.stringify(notesEditor.originalItems)),
                        selectedId: id,
                        undoArray: [],
                        redoArray: []

                    })
                }
            }
        } else {
            setNotesEditor({
                ...notesEditor,
                selectedId: id
            })
        }

    }
    return (
        <div className='sidebar-note-list-item'>
            <header className="sidebar-note-header">
                <strong>{note.name}</strong>
            </header>
            <button className="sidebar-note-open"
                style={{
                    border: isActive
                        ? '1px solid var(--primary-border)'
                        : '1px solid transparent',
                }}
                onClick={clickHandler}>
            </button>
        </div>

    )
}

export default PreviewNote
