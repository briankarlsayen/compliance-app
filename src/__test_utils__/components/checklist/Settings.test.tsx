import {
    fireEvent,
    screen,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import Settings from '../../../pages/Settings'
import { MemoryRouter } from 'react-router-dom'

describe('<Settings />', () => {
    it('renders table', async () => {
        render(
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        )

        expect(screen.getByText('Settings')).toBeInTheDocument
        expect(screen.getByText('General')).toBeInTheDocument
        expect(screen.getByText('Access')).toBeInTheDocument
        expect(screen.getByText('PDF Report')).toBeInTheDocument
        expect(screen.getByText('Schedule/Survey')).toBeInTheDocument

        expect(screen.getByText('Save')).not.toBeDisabled
        expect(screen.getByText('Save and Copy')).not.toBeDisabled
        expect(screen.getByText('Cancel')).not.toBeDisabled
    })
})
