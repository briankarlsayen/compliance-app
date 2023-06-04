import {
    fireEvent,
    screen,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Promotion from '../../../pages/Promotion'

describe('<Promotion />', () => {
    it('renders table', async () => {
        render(
            <MemoryRouter>
                <Promotion />
            </MemoryRouter>
        )

        expect(screen.getByText('Promote Template')).toBeInTheDocument

        expect(screen.getByText('Cancel')).not.toBeDisabled
        expect(screen.getByText('Save')).not.toBeDisabled
    })
})
