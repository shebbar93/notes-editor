import React, { useState } from 'react'
import GenerateField from './GenerateFields'
import { useLocation } from '../Context/LocationContext';
import clone from '../CustomHook/Clone'
import Toast from './Toast'

const NoteDetails = ({ selectedId, notesData }) => {
    const [notesEditor, setNotesEditor] = useLocation();
    let { items } = notesEditor.notesData;
    let note = items.filter(x => x.id === selectedId);
    let { name } = note.length && note[0]
    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const onSaveHandler = () => {
        const unSelectedNotes = items.filter(x => x.id !== selectedId)
        localStorage.setItem('lists', JSON.stringify({
            ...notesEditor.notesData,
            items: [...note, ...unSelectedNotes]
        }))
        setNotesEditor({
            ...notesEditor,
            undoArray: [],
            redoArray: []
        })
        showToast()
        setToastMessage('Saved data successfully.')
    }
    const onCancelHandler = () => {
        if (window.confirm('Are you sure you want to restore to original default values.?')) {
            const unSelectedNotes = items.filter(x => x.id !== selectedId)
            const originalNote = notesEditor.originalItems.items.filter(x => x.id === selectedId)
            if (localStorage.getItem('lists')) {
                localStorage.setItem('lists', JSON.stringify({
                    ...notesEditor.notesData,
                    items: [...originalNote, ...unSelectedNotes]
                }))
            }
            
            setNotesEditor({
                ...notesEditor,
                notesData: {
                    ...notesEditor.notesData,
                    items: [...originalNote, ...unSelectedNotes]
                },
                undoArray: [],
                redoArray: []
            })
            showToast()
            setToastMessage('Data restored successfully.')
        }
    }
    const onUndoHandler = () => {
        let tempDataToRedoClone = []
        let newSelectedSingleNote = []
        let newFilteredNotesList = []
        let undoLength = notesEditor.undoArray.length;
        if (undoLength) {
            const tempDataToRedo = notesEditor.undoArray[undoLength - 1]
            tempDataToRedoClone = clone(tempDataToRedo)
            notesEditor.undoArray.splice(-1, 1)
            undoLength--;
            newSelectedSingleNote = {
                ...note[0],
                fields: notesEditor.undoArray[undoLength - 1]
            }
            newFilteredNotesList = notesEditor.notesData.items.filter(x => x.id !== selectedId)
        }
        const tempNotesData = (undoLength ? ({ ...notesEditor.notesData, items: [...newFilteredNotesList, newSelectedSingleNote] }) : notesEditor.originalItems)

        setNotesEditor({
            ...notesEditor,
            redoArray: [...notesEditor.redoArray, tempDataToRedoClone],
            notesData: tempNotesData
        })
    }

    const onRedoHandler = () => {
        let tempDataToUndoClone = []
        let redoLength = notesEditor.redoArray.length;
        let newSelectedSingleNote = [];
        let newFilteredNotesList = []
        if (redoLength) {
            const tempDataToUndo = notesEditor.redoArray[redoLength - 1]
            tempDataToUndoClone = clone(tempDataToUndo)
            notesEditor.redoArray.splice(-1, 1)
            newSelectedSingleNote = {
                ...note[0],
                fields: tempDataToUndoClone
            }

            newFilteredNotesList = notesEditor.notesData.items.filter(x => x.id !== selectedId)
        }
        const tempNotesData = (redoLength ? ({ ...notesEditor.notesData, items: [...newFilteredNotesList, newSelectedSingleNote] }) : notesEditor.originalItems)

        setNotesEditor({
            ...notesEditor,
            undoArray: [...notesEditor.undoArray, tempDataToUndoClone],
            notesData: tempNotesData
        })
        redoLength--;
    }
    const showToast = () => {
        setShow(true);
    };

    const hideToast = () => {
        setShow(false);
    };
    return (
        <>
            {selectedId ?
                (<div className="note">
                    <Toast show={show} hideToast={hideToast}>
                        {toastMessage}
                    </Toast>
                    <div className="note-header">
                        <h1 className="note-title">{name}</h1>
                        {/* <div className="note-menu"> */}
                        <div>
                            <button className='edit-button edit-button--outline' onClick={onRedoHandler} disabled={notesEditor.redoArray.length === 0}>
                                Redo
                            </button>
                            <button className='edit-button edit-button--outline' onClick={onUndoHandler} disabled={notesEditor.undoArray.length === 0}>
                                Undo
                            </button>
                            <button className='edit-button edit-button--outline' onClick={onSaveHandler}>
                                Save
                            </button>
                            <button className='note-editor-delete' onClick={onCancelHandler}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <GenerateField note={note[0]} />
                </div>)
                :
                (<div className="note--empty-state">
                    <span className="note-text--empty-state">
                        Click a note on the left to view something!😊
                </span>
                </div>)
            }
        </>

    )
}

export default NoteDetails
