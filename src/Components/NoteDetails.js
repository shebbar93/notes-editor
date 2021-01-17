import React, { useState, useContext } from 'react'
import GenerateField from './GenerateFields'
import { LocationContext } from '../Context/LocationContext';
import clone from '../CustomHook/Clone'
import Toast from './Toast'
import types from '../Context/types'

const NoteDetails = () => {

    // const [notesEditor, setNotesEditor] = useLocation();
    const locationContext = useContext(LocationContext)
    const { notesData, selectedId, dispatch, undoArray, redoArray, originalItems } = locationContext
    let { items } = notesData;
    let note = items.filter(x => x.id === selectedId);
    let { name } = note.length && note[0]
    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const onSaveHandler = () => {
        const unSelectedNotes = items.filter(x => x.id !== selectedId)
        localStorage.setItem('lists', JSON.stringify({
            ...notesData,
            items: [...note, ...unSelectedNotes]
        }))
        // setNotesEditor({
        //     ...notesEditor,
        //     undoArray: [],
        //     redoArray: []
        // })
        dispatch({
            type: types.SAVE_NOTE_HANDLER,
            payload: notesData
        })
        showToast('Saved data successfully.')
    }
    const onCancelHandler = () => {
        if (window.confirm('Are you sure you want to restore to original default values.?')) {
            const unSelectedNotes = items.filter(x => x.id !== selectedId)
            const originalNoteItems = JSON.parse(JSON.stringify(originalItems.items));
            const originalNote = originalNoteItems.filter(x => x.id === selectedId)
            if (localStorage.getItem('lists')) {
                localStorage.setItem('lists', JSON.stringify({
                    ...notesData,
                    items: [...originalNote, ...unSelectedNotes]
                }))
            }
            dispatch({
                type: types.CANCEL_NOTE_HANDLER,
                payload: {
                    notesData: {
                        ...notesData,
                        items: [...originalNote, ...unSelectedNotes]
                    }
                }
            })
            // setNotesEditor({
            //     ...notesEditor,
            //     notesData: {
            //         ...notesEditor.notesData,
            //         items: [...originalNote, ...unSelectedNotes]
            //     },
            //     undoArray: [],
            //     redoArray: []
            // })
            showToast('Data restored successfully.')
        }
    }
    const onUndoHandler = () => {
        let tempDataToRedoClone = []
        let newSelectedSingleNote = []
        let newFilteredNotesList = []
        let undoLength = undoArray.length;
        if (undoLength) {
            const tempDataToRedo = undoArray[undoLength - 1]
            tempDataToRedoClone = clone(tempDataToRedo)
            undoArray.splice(-1, 1)
            undoLength--;
            newSelectedSingleNote = {
                ...note[0],
                fields: undoArray[undoLength - 1]
            }
            newFilteredNotesList = notesData.items.filter(x => x.id !== selectedId)
        }
        const tempNotesData = (
            undoLength ? ({ ...notesData, items: [...newFilteredNotesList, newSelectedSingleNote] }) : localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : JSON.parse(JSON.stringify(originalItems)))

        dispatch({
            type: types.UNDO_HANDLER,
            payload: {
                redoArray: [...redoArray, tempDataToRedoClone],
                notesData: tempNotesData
            }
        })
        // setNotesEditor({
        //     ...notesEditor,
        //     redoArray: [...notesEditor.redoArray, tempDataToRedoClone],
        //     notesData: tempNotesData
        // })
    }

    const onRedoHandler = () => {
        let tempDataToUndoClone = []
        let redoLength = redoArray.length;
        let newSelectedSingleNote = [];
        let newFilteredNotesList = []
        if (redoLength) {
            const tempDataToUndo = redoArray[redoLength - 1]
            tempDataToUndoClone = clone(tempDataToUndo)
            redoArray.splice(-1, 1)
            newSelectedSingleNote = {
                ...note[0],
                fields: tempDataToUndoClone
            }

            newFilteredNotesList = notesData.items.filter(x => x.id !== selectedId)
        }
        const tempNotesData = (redoLength ? ({ ...notesData, items: [...newFilteredNotesList, newSelectedSingleNote] }) : JSON.parse(JSON.stringify(originalItems)))

        // setNotesEditor({
        //     ...notesEditor,
        //     undoArray: [...notesEditor.undoArray, tempDataToUndoClone],
        //     notesData: tempNotesData
        // })
        dispatch({
            type: types.REDO_HANDLER,
            payload: {
                undoArray: [...undoArray, tempDataToUndoClone],
                notesData: tempNotesData
            }
        })
        redoLength--;
    }
    const showToast = (msg) => {
        setShow(true);
        setToastMessage(msg)
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
                            <button className='edit-button edit-button--outline' onClick={onRedoHandler} disabled={redoArray.length === 0}>
                                Redo
                            </button>
                            <button className='edit-button edit-button--outline' onClick={onUndoHandler} disabled={undoArray.length === 0}>
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
