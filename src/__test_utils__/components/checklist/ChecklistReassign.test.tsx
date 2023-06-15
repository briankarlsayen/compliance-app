import { screen, render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import ChecklistReassign from '../../../pages/ChecklistReassign'

describe('<ChecklistReassign />', () => {
    it('renders table', async () => {
        const mockData = {
            centre: 'Head Office',
            complete: false,
            createdDate: '5/06/2023',
            creator: 'User 2',
            id: 2,
            name: 'User 2',
            room: 'Room2',
            score: '0/12',
            template: 'Template 2',
            ticket: '743',
        }
        render(
            <MemoryRouter>
                <Route
                    render={(props) => {
                        props.history.location.state = [mockData]
                        return <ChecklistReassign />
                    }}
                />
            </MemoryRouter>
        )

        expect(screen.getByTestId('reassign-table')).toBeInTheDocument
        expect(screen.getByRole('table')).toBeInTheDocument
        expect(screen.getByRole('rowheader')).toBeInTheDocument
        expect(screen.getAllByRole('columnheader').length).toBe(4)
        expect(screen.getByText('Back')).not.toBeDisabled
        expect(screen.getByText('Reassign')).not.toBeDisabled

        expect(screen.queryAllByRole('cell')).toHaveLength(4)
        expect(screen.getByText(mockData.name)).toBeInTheDocument
        expect(screen.getByText(mockData.centre)).toBeInTheDocument
        expect(screen.getByText(mockData.room)).toBeInTheDocument
    })
})
