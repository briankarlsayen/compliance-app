import { fireEvent, screen, render } from '@testing-library/react'
import CheckLists, { ICheckListData } from '../../../pages/Checklists'
import { MemoryRouter } from 'react-router-dom'
import * as api from '../../../api'
jest.mock('../../../api/index')

const mockResolvedVal = (mockVal: any) => {
    console.log('mockVal', mockVal)
    global.fetch = jest.fn(() => {
        Promise.resolve({
            json: () => Promise.resolve({ ...mockVal }),
        })
    }) as any
}

describe('<Checklists />', () => {
    let mockData = [] as ICheckListData[]

    it('renders table', async () => {
        mockData.push(
            {
                title: '1Place Standard Centre Closing Procedure // v1.3',
                schedules: 5,
                template: 'partner',
                status: 'active',
                adhoc: false,
            },
            {
                title: '1Place Standard Centre Closing Procedure // v1.4',
                schedules: 1,
                template: 'form',
                status: 'inactive',
                adhoc: true,
            }
        )
        await mockResolvedVal(mockData)
        render(
            <MemoryRouter>
                <CheckLists />
            </MemoryRouter>
        )
        expect(mockResolvedVal).toHaveBeenCalledTimes(1)
        expect(screen.getByTestId('checklist-table')).toBeInTheDocument
        expect(screen.getByRole('table')).toBeInTheDocument
        expect(screen.getByRole('rowheader')).toBeInTheDocument
        expect(screen.getAllByRole('columnheader').length).toBe(3)
        // expect(screen.getAllByRole('cell').length).toBe(30)
        expect(screen.getAllByRole('row').length).toBe(10)
    })
})
