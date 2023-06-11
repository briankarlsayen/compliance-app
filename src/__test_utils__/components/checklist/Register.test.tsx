import {
    fireEvent,
    screen,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Register from '../../../pages/Register'

describe('<Register />', () => {
    it('renders table', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        expect(screen.queryByAltText('Loading')).toBeInTheDocument
        await waitForElementToBeRemoved(screen.queryByAltText('Loading'), {
            timeout: 10000,
        })

        expect(screen.getByTestId('register-table')).toBeInTheDocument
        expect(screen.getByRole('table')).toBeInTheDocument
        expect(screen.getByRole('rowheader')).toBeInTheDocument
        expect(screen.getAllByRole('columnheader').length).toBe(10)
    })
})
