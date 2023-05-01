import React from 'react'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import SimpleTable, {
    ISimpleTableProps,
} from '../../../components/common/SimpleTable'
import { MemoryRouter } from 'react-router-dom'

describe('<SimpleTableProp />', () => {
    it('renders table', async () => {
        const onClickColumn2 = jest.fn()
        const onClickColumn4 = jest.fn()

        const tableProps = {
            header: ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
            rows: [
                {
                    id: 1000,
                    columns: [
                        {
                            content: 'Content Column 1.1',
                            linkTo: 'htttp://www.google.com',
                        },
                        {
                            content: 'Content Column 1.2',
                            onClick: onClickColumn2,
                        },
                        {
                            content: <div>Content Column 1.3</div>,
                        },
                        {
                            content: React.createElement(
                                'p',
                                null,
                                'Content Column 1.4'
                            ),
                            onClick: onClickColumn4,
                        },
                    ],
                },
                {
                    id: 1001,
                    columns: [
                        {
                            content: 'Content Column 2.1',
                            linkTo: 'htttp://www.google.com',
                        },
                        {
                            content: 'Content Column 2.2',
                            onClick: onClickColumn2,
                        },
                        {
                            content: <div>Content Column 2.3</div>,
                        },
                        {
                            content: React.createElement(
                                'p',
                                null,
                                'Content Column 2.4'
                            ),
                            onClick: onClickColumn4,
                        },
                    ],
                },
            ],
        } as ISimpleTableProps
        render(
            <MemoryRouter>
                <SimpleTable {...tableProps} />
            </MemoryRouter>
        )

        expect(screen.getByTestId('simple-table')).toBeInTheDocument()
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getByRole('rowheader')).toBeInTheDocument()
        expect(screen.getAllByRole('columnheader').length).toBe(4)
        expect(screen.getAllByRole('row').length).toBe(2)
        expect(screen.getAllByRole('cell').length).toBe(8)

        expect(screen.getAllByRole('columnheader')[0].textContent).toBe(
            tableProps.header[0]
        )
        expect(screen.getAllByRole('columnheader')[1].textContent).toBe(
            tableProps.header[1]
        )
        expect(screen.getAllByRole('columnheader')[2].textContent).toBe(
            tableProps.header[2]
        )
        expect(screen.getAllByRole('columnheader')[3].textContent).toBe(
            tableProps.header[3]
        )

        expect(screen.getAllByRole('cell')[0].textContent).toBe(
            tableProps.rows[0].columns[0].content
        )
        expect(screen.getAllByRole('cell')[7].textContent).toBe(
            tableProps.rows[1].columns[3].content.props.children
        )

        fireEvent.click(screen.getByText(tableProps.rows[0].columns[1].content))
        expect(onClickColumn2).toHaveBeenCalledTimes(1)

        fireEvent.click(
            screen.getByText(
                tableProps.rows[0].columns[3].content.props.children
            )
        )
        fireEvent.click(
            screen.getByText(
                tableProps.rows[1].columns[3].content.props.children
            )
        )
        expect(onClickColumn4).toHaveBeenCalledTimes(2)
    })
})
