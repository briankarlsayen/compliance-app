import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import IntegrationListing from '../../../components/integration/IntegrationListing'
import { MemoryRouter, Route } from 'react-router-dom'
import * as api from '../../../data_sources/api'
import { IIntegration, IIntegrationApp } from 'oneplace-components'
import {
    mockFunction,
    waitForLoading,
} from '../../../__test_utils__/testHelpers'
import { queryActions } from '../../../constants'

jest.mock('../../../data_sources/api')

describe('<IntegrationListing />', () => {
    let mockedApps = [] as IIntegrationApp[]
    const getIntegrationAppsMock = mockFunction(api.getIntegrationApps)

    afterEach(() => {
        mockedApps = []
    })

    it('renders successfully', async () => {
        mockedApps.push(
            {
                id: 1,
                name: 'Infocare',
                integrationId: -1,
                integrationStatus: null,
                appName: 'INFOCARE',
            },
            {
                id: 2,
                name: 'KidsSoft',
                integrationId: -1,
                integrationStatus: null,
                appName: 'KIDSOFT',
            }
        )
        getIntegrationAppsMock.mockResolvedValue(mockedApps)

        renderWithKeycloak(() => (
            <MemoryRouter>
                <IntegrationListing />
            </MemoryRouter>
        ))

        await waitForLoading()
        //screen.debug()
        expect(getIntegrationAppsMock).toHaveBeenCalledTimes(1)
        expect(screen.queryAllByRole('cell')).toHaveLength(8)
        expect(screen.queryAllByText('Activate')).toHaveLength(2)
        expect(screen.queryAllByText(mockedApps[0].name)).toBeDefined()
        expect(screen.queryAllByText(mockedApps[1].name)).toBeDefined()
    })

    it('shows message after saving details page', async () => {
        renderWithKeycloak(() => (
            <MemoryRouter>
                <Route
                    render={(props) => {
                        props.history.location.search = `?action=${queryActions.SAVED}`
                        return <IntegrationListing />
                    }}
                />
            </MemoryRouter>
        ))
        await waitForLoading()
        expect(
            screen.getByText('Integration saved successfully!')
        ).toBeInTheDocument()
        expect(getIntegrationAppsMock).toHaveBeenCalledTimes(1)
    })

    it('deactivates integration', async () => {
        mockedApps.push({
            id: 1,
            name: 'Infocare',
            integrationId: 99,
            integrationStatus: 'active',
            appName: 'infocare',
        })
        const mockedIntegration = {
            id: 99,
            name: 'My Integration',
        } as IIntegration
        getIntegrationAppsMock.mockResolvedValue(mockedApps)
        const changeIntegrationStatusMock = mockFunction(
            api.changeIntegrationStatus
        )
        changeIntegrationStatusMock.mockResolvedValue(mockedIntegration)
        renderWithKeycloak(() => (
            <MemoryRouter>
                <IntegrationListing />
            </MemoryRouter>
        ))

        await waitForLoading()
        expect(getIntegrationAppsMock).toHaveBeenCalledTimes(1)
        expect(screen.getByText('Deactivate')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Deactivate'))
        await waitForLoading()
        expect(changeIntegrationStatusMock).toHaveBeenCalledTimes(1)
        expect(screen.getByText('Activate')).toBeInTheDocument()
    })
})
