import {
    fireEvent,
    screen,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Versions from '../../../pages/Versions'

describe('<Versions />', () => {
    it('renders table', async () => {
        render(
            <MemoryRouter>
                <Versions />
            </MemoryRouter>
        )

        expect(screen.queryByAltText('Loading')).toBeInTheDocument
        await waitForElementToBeRemoved(screen.queryByAltText('Loading'), {
            timeout: 10000,
        })

        expect(screen.getByTestId('version-table')).toBeInTheDocument
        expect(screen.getByRole('table')).toBeInTheDocument
        expect(screen.getByRole('rowheader')).toBeInTheDocument
        expect(screen.getAllByRole('columnheader').length).toBe(5)
    })
})
