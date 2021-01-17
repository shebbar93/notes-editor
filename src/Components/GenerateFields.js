import React, { useState, useEffect, useContext } from 'react'
import { LocationContext } from '../Context/LocationContext'
import clone from '../CustomHook/Clone'
import types from '../Context/types'

const GenerateFields = ({ note }) => {
    const [fields, setFields] = useState(null)
    const locationContext = useContext(LocationContext)
    const { dispatch, undoArray } = locationContext
    // const [notesEditor, setNotesEditor] = useLocation();
    const sameFieldValues = {}

    useEffect(() => {
        note && setFields(note.fields)
        return () => {
        }
    }, [note])
    const onFocusHandler = (e, id, type) => {
        sameFieldValues[id] = (type === 'toggle' ? e.target.checked : e.target.value)
    }
    const onBlurHandler = (e, id, type) => {
        if (sameFieldValues[id] !== (type === 'toggle' ? e.target.checked : e.target.value)) {
            const fieldsCopy = clone(fields)
            // setNotesEditor({
            //     ...notesEditor,
            //     undoArray: [...notesEditor.undoArray, fieldsCopy],
            // })
            dispatch({
                type: types.FIELD_BLUR_HANDLER,
                payload: {
                    undoArray: [...undoArray, fieldsCopy],
                }
            })

        }
    }
    const inputChange = (e, id, type) => {
        setFields(fields.map(x => {
            if (x.id === id) {
                if (x.fieldType === 'toggle')
                    x.fieldValue = e.target.checked
                else
                    x.fieldValue = e.target.value
            }
            return x;
        }))
    }
    return (
        <div className="note-preview">

            {
                fields && fields.map(f => {
                    if (f.fieldType === 'text') {
                        return (
                            <React.Fragment key={f.id}>
                                <div>{f.fieldName}</div>
                                <div>
                                    <input type="text" value={f.fieldValue}
                                        onFocus={(e) => onFocusHandler(e, f.id, f.fieldType)}
                                        onChange={(e) => inputChange(e, f.id, f.fieldType)}
                                        onBlur={(e) => onBlurHandler(e, f.id, f.fieldType)} />
                                </div>
                            </React.Fragment>)
                    }
                    else if (f.fieldType === 'toggle') {
                        return (
                            <div key={f.id}>
                                <label className="pointer">
                                    <input type="checkbox" checked={f.fieldValue}
                                        onFocus={(e) => onFocusHandler(e, f.id, f.fieldType)}
                                        onChange={(e) => inputChange(e, f.id, f.fieldType)}
                                        onBlur={(e) => onBlurHandler(e, f.id, f.fieldType)} />
                                    {f.fieldName}
                                </label>
                            </div>)
                    }
                    else if (f.fieldType === 'option') {
                        return (
                            <React.Fragment key={f.id}>
                                <div>{f.fieldName}</div>
                                <div>
                                    <select value={f.fieldValue}
                                        onFocus={(e) => onFocusHandler(e, f.id, f.fieldType)}
                                        onChange={(e) => inputChange(e, f.id, f.fieldType)}
                                        onBlur={(e) => onBlurHandler(e, f.id, f.fieldType)}>
                                        {f.fieldOptions.map(op => (<option key={op.optionValue} value={op.optionValue}>{op.optionName}</option>))}
                                    </select>
                                </div>
                            </React.Fragment>)
                    }
                    else
                        return null
                })
            }

        </div>
    )
}

export default GenerateFields
