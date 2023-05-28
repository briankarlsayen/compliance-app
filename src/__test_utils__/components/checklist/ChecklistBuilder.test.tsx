import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ChecklistBuilder from '../../../pages/ChecklistBuilder'
import { MemoryRouter } from 'react-router-dom'

describe('ChecklistBuilder', () => {
    it('should render all steps in the Stepper', () => {
        render(
            <MemoryRouter>
                <ChecklistBuilder />
            </MemoryRouter>
        )

        // Replace the following example steps with your actual step labels

        expect(screen.getByText('General')).toBeInTheDocument
        expect(screen.getByText('Access')).toBeInTheDocument
        expect(screen.getByText('PDF Report')).toBeInTheDocument
        expect(screen.getByText('Schedule/Survey')).toBeInTheDocument
    })

    // it('should navigate to the next step when the "Next" button is clicked', () => {
    //     const { getByText } = render(<ChecklistBuilder />)

    //     const nextButton = getByText('Next')
    //     fireEvent.click(nextButton)

    //     // Replace the following example assertion with your actual logic for the next step
    //     expect(getByText('Select Profiles')).toBeInTheDocument()
    // })

    // it('should navigate to the previous step when the "Back" button is clicked', () => {
    //     const { getByText } = render(<ChecklistBuilder />)

    //     // Assuming you have already navigated to the second step
    //     const backButton = getByText('Back')
    //     fireEvent.click(backButton)

    //     // Replace the following example assertion with your actual logic for the previous step
    //     expect(getByText('Step 1 Content')).toBeInTheDocument()
    // })
})
