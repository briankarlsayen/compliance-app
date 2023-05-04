import {
    fireEvent,
    screen,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import Schedules, { IScheduleData } from '../../../pages/Schedules'
import { MemoryRouter } from 'react-router-dom'

describe('<Schedules />', () => {
    it('renders table', async () => {
        render(
            <MemoryRouter>
                <Schedules />
            </MemoryRouter>
        )

        expect(screen.queryByAltText('Loading')).toBeInTheDocument
        await waitForElementToBeRemoved(screen.queryByAltText('Loading'), {
            timeout: 10000,
        })

        expect(screen.getByTestId('schedule-table')).toBeInTheDocument
        expect(screen.getByRole('table')).toBeInTheDocument
        expect(screen.getByRole('rowheader')).toBeInTheDocument
        expect(screen.getAllByRole('columnheader').length).toBe(5)
    })
})
