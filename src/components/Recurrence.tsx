import RRuleGenerator from 'react-rrule-generator'
import '../styles/Recurrence.css'
import { IInputField } from '../pages/EditSchedule'

interface PRecurrence {
    setInputField: any
    inputField: IInputField
}

const Recurrence = ({ setInputField, inputField }: PRecurrence) => {
    return (
        <div id="recurrence-input">
            <RRuleGenerator
                config={{
                    repeat: ['Yearly', 'Monthly', 'Weekly', 'Hourly'],
                }}
                value={inputField.rrule}
                onChange={(e: string) =>
                    setInputField({ ...inputField, rrule: e })
                }
            />
        </div>
    )
}

export default Recurrence
