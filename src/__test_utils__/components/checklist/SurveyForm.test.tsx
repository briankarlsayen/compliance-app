import {
    fireEvent,
    screen,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import SurveyForm from '../../../pages/SurveyForm'

describe('<ScheduleForm />', () => {
    it('renders form', async () => {
        render(
            <MemoryRouter>
                <Route
                    render={(props) => {
                        props.location.pathname = `/checklists/schedules/0`
                        props.match = {
                            path: '/checklists/schedules/0',
                            url: `/checklists/schedules/0`,
                            params: { id: '0' },
                            isExact: true,
                        }
                        return <SurveyForm />
                    }}
                />
            </MemoryRouter>
        )

        expect(screen.queryByAltText('Edit Survey')).toBeInTheDocument
        expect(screen.getByText('Save')).not.toBeDisabled
        expect(screen.getByText('Save and Copy')).not.toBeDisabled
        expect(screen.getByText('Cancel')).not.toBeDisabled
    })

    it('expects to click copy', async () => {
        render(
            <MemoryRouter>
                <Route
                    render={(props) => {
                        props.location.pathname = `/checklists/schedules/0`
                        props.match = {
                            path: '/checklists/schedules/0',
                            url: `/checklists/schedules/0`,
                            params: { id: '0' },
                            isExact: true,
                        }
                        return <SurveyForm />
                    }}
                />
            </MemoryRouter>
        )

        // fireEvent(
        //     screen.getByText('Copy'),
        //     new MouseEvent('click', {
        //         bubbles: true,
        //         cancelable: true,
        //     })
        // )
        // expect(screen.queryByAltText('Copied')).toBeInTheDocument
    })
})
