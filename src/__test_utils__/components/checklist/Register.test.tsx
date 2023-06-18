import {
    fireEvent,
    screen,
    render,
    waitForElementToBeRemoved,
    within,
    getByTestId,
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
        expect(screen.getAllByRole('columnheader').length).toBe(11)

        expect(screen.getByText('Reassign')).not.toBeDisabled
        expect(screen.getByText('Generate Custom Report')).not.toBeDisabled
        expect(screen.getByText('Lock/Unlock Update')).not.toBeDisabled

        expect(screen.getByText('Complete Checklist')).not.toBeDisabled
    })

    it('should select and unselect rows when clicked', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        expect(screen.queryByAltText('Loading')).toBeInTheDocument
        await waitForElementToBeRemoved(screen.queryByAltText('Loading'), {
            timeout: 10000,
        })

        expect(screen.getByRole('checkbox-header')).toBeInTheDocument
        expect(screen.getAllByTestId('checkbox-component')).toBeInTheDocument
        const checkboxAll = screen.getByRole('checkbox-header')
        const checkboxes = screen.getAllByTestId('checkbox-component')

        const firstCheckbox = checkboxes[0] as any

        // Check if initially no rows are selected
        checkboxes.forEach((checkbox: any) => {
            expect(checkbox.checked).toBe(false)
        })

        // Click the "select all" checkbox
        fireEvent.click(checkboxAll)

        // Check if all rows are selected
        checkboxes.forEach((checkbox: any) => {
            expect(checkbox.checked).toBe(true)
        })

        // Click the "select all" checkbox again
        fireEvent.click(checkboxAll)

        // Check if all rows are unselected
        checkboxes.forEach((checkbox: any) => {
            expect(checkbox.checked).toBe(false)
        })

        // Click a row checkbox
        expect(firstCheckbox.checked).toBe(false)

        fireEvent.click(firstCheckbox)
        // Check if the first row is unselected
        expect(firstCheckbox.checked).toBe(true)
    })

    it('should lock and unlock rows when clicked', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        expect(screen.queryByAltText('Loading')).toBeInTheDocument
        await waitForElementToBeRemoved(screen.queryByAltText('Loading'), {
            timeout: 10000,
        })
        expect(screen.getAllByTestId('lock-icon')).toBeInTheDocument
        expect(screen.getAllByTestId('lock-unlock-btn')).toBeInTheDocument

        expect(screen.getAllByTestId('lock-icon').length).toBe(3)

        const checkboxes = screen.getAllByTestId('checkbox-component')
        const firstCheckbox = checkboxes[0] as any
        fireEvent.click(firstCheckbox)

        const lockUnlockBtn = screen.getByTestId('lock-unlock-btn')
        fireEvent.click(lockUnlockBtn)

        expect(screen.getAllByTestId('lock-icon').length).toBe(2)
    })
})
