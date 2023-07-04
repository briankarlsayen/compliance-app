import RRuleGenerator from 'react-rrule-generator'
import '../styles/Recurrence.css'
import { IInputField } from '../pages/ScheduleFormContainer'
import { rrulestr } from 'rrule'

interface PRecurrence {
    setInputField: any
    inputField: IInputField
}

const Recurrence = ({ setInputField, inputField }: PRecurrence) => {
    return (
        <div id="recurrence-input">
            <RRuleGenerator
                config={{
                    repeat: ['Monthly', 'Weekly', 'Hourly', 'Daily'],
                }}
                value={inputField.event.rRule}
                onChange={(e: string) => {
                    const ruleDescription = rrulestr(e).toText()
                    const event = {
                        ...inputField.event,
                        rRuleDescription: ruleDescription,
                        rRule: e,
                    }

                    setInputField({ ...inputField, event })
                }}
            />
        </div>
    )
}

export default Recurrence
