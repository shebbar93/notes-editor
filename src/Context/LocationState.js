import React, { useReducer } from 'react'
import { LocationContext } from './LocationContext'
import LoctionReducer from './LocationReducer'
import data from '../Data/NotesData'
// import types from './types'

const LocationState = (props) => {

    const initialState = {
        selectedId: null,
        notesData: JSON.parse(JSON.stringify(data)),
        originalItems: data,
        undoArray: [],
        redoArray: []
    }

    const [state, dispatch] = useReducer(LoctionReducer, initialState)

    // const fetchFromLocalStorage = async () => {
        // if (localStorage.getItem('lists') && state.selectedId === null) {
        //     dispatch({
        //         type: types.FETCH_FROM_LOCAL_STORAGE,
        //         payload: JSON.parse(localStorage.getItem('lists'))
        //     })
        // }
    // }

    return (
        <LocationContext.Provider value={{
            selectedId: state.selectedId,
            notesData: state.notesData,
            originalItems: state.originalItems,
            undoArray: state.undoArray,
            redoArray: state.redoArray,
            dispatch : dispatch
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationState