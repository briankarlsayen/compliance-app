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

        expect(screen.queryByAltText('Edit')).toBeInTheDocument
        await waitForElementToBeRemoved(screen.queryByAltText('Loading'), {
            timeout: 10000,
        })
        expect(screen.queryByAltText('Edit Schedule')).toBeInTheDocument
    })
})
