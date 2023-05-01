import React from 'react'
import RRuleGenerator from 'react-rrule-generator'
import '../styles/Recurrence.css'

const Recurrence = ({ setInputField, inputField }) => {
    return (
        <div id="recurrence-input">
            <RRuleGenerator
                value={inputField.rrule}
                onChange={(e: string) =>
                    setInputField({ ...inputField, rrule: e })
                }
            />
        </div>
    )
}

export default Recurrence
