import React, { useContext, useEffect } from 'react'
import NotesListData from './NotesListData'
import NoteDetails from './NoteDetails'
import { LocationContext } from '../Context/LocationContext'
import types from '../Context/types'

const Child = ({ title }) => {
    //const [notesEditor] = useLocation()
    const locationContext = useContext(LocationContext)
    const { selectedId, dispatch } = locationContext
    const fetchFromLocalStorage = async () => {
        if (localStorage.getItem('lists') && selectedId === null) {
            dispatch({
                type: types.FETCH_FROM_LOCAL_STORAGE,
                payload: JSON.parse(localStorage.getItem('lists'))
            })
        }
    }
    useEffect(() => {
        fetchFromLocalStorage()
        //eslint-disable-next-line
    }, [])

    return (
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
                    <strong>{title}</strong>
                </section>
                <nav>
                    <NotesListData />
                </nav>
            </section>
            <section className="col note-viewer">
                {/* <NoteDetails selectedId={notesEditor.selectedId} notesData={notesEditor.notesData} /> */}
                <NoteDetails />
            </section>
        </div>
    )
}

export default Child
