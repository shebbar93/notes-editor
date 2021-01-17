import types from './types'
const LocationReducer = (state, action) => {
    switch (action.type) {
        case types.FETCH_FROM_LOCAL_STORAGE: return {
            ...state,
            notesData: action.payload
        }
        case types.SET_SELECTED_NOTE:
            return {
                ...state,
                selectedId: action.payload.selectedId,
                notesData: action.payload.notesData ? action.payload.notesData : { ...state.notesData },
                undoArray: [],
                redoArray: []
            }
        case types.SAVE_NOTE_HANDLER:
            return {
                ...state,
                notesData: action.payload,
                undoArray: [],
                redoArray: []
            }
        case types.CANCEL_NOTE_HANDLER:
            return {
                ...state,
                notesData: action.payload.notesData,
                undoArray: [],
                redoArray: []
            }
        case types.FIELD_BLUR_HANDLER:
            return {
                ...state,
                undoArray: action.payload.undoArray
            }
        case types.UNDO_HANDLER:
            return {
                ...state,
                redoArray: action.payload.redoArray,
                notesData: action.payload.notesData
            }
        case types.REDO_HANDLER:
            return {
                ...state,
                undoArray: action.payload.undoArray,
                notesData: action.payload.notesData
            }
        default: return state
    }
}
export default LocationReducer