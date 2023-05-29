import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import ChecklistBuilder from '../../../pages/ChecklistBuilder'
import { MemoryRouter } from 'react-router-dom'

describe('<ChecklistBuilder />', () => {
    it('should render all steps in the Stepper', () => {
        render(
            <MemoryRouter>
                <ChecklistBuilder />
            </MemoryRouter>
        )

        expect(screen.getByText('General')).toBeInTheDocument
        expect(screen.getByText('Access')).toBeInTheDocument
        expect(screen.getByText('PDF Report')).toBeInTheDocument
        expect(screen.getByText('Schedule/Survey')).toBeInTheDocument
        expect(screen.getByText('Next')).not.toBeDisabled
        expect(screen.getByText('Back')).toBeDisabled
    })

    it('should navigate to the next step when the "Next" button is clicked', async () => {
        render(
            <MemoryRouter>
                <ChecklistBuilder />
            </MemoryRouter>
        )

        // step 2
        const nextButton = screen.getByText('Next')
        fireEvent.click(nextButton)
        expect(screen.getByText('Select Profiles')).toBeInTheDocument
        expect(screen.getByText('Next')).not.toBeDisabled
        expect(screen.getByText('Back')).not.toBeDisabled

        // step 3
        fireEvent.click(nextButton)
        expect(screen.getByText('Logo')).toBeInTheDocument
        expect(screen.getByText('Layout')).toBeInTheDocument
        expect(screen.getByText('Next')).not.toBeDisabled
        expect(screen.getByText('Back')).not.toBeDisabled

        // step 4
        screen.getByText('Next')
        fireEvent.click(nextButton)
        expect(screen.getByText('Finish')).not.toBeDisabled
        expect(screen.getByText('Back')).not.toBeDisabled
    })

    it('should navigate to the previous step when the "Back" button is clicked', () => {
        render(
            <MemoryRouter>
                <ChecklistBuilder />
            </MemoryRouter>
        )

        // step 2
        const nextButton = screen.getByText('Next')
        fireEvent.click(nextButton)
        expect(screen.getByText('Select Profiles')).toBeInTheDocument
        expect(screen.getByText('Next')).not.toBeDisabled
        expect(screen.getByText('Back')).not.toBeDisabled

        // step 1
        const backButton = screen.getByText('Back')
        fireEvent.click(backButton)
        expect(screen.getByText('Next')).not.toBeDisabled
        expect(screen.getByText('Back')).toBeDisabled
    })
})
