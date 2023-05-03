import React from 'react'
import { screen } from '@testing-library/react'
import { MemoryRouter, Route, RouteComponentProps } from 'react-router-dom'
import * as api from '../../../data_sources/api'
import { IIntegration, MockOneplaceLibraryContext } from 'oneplace-components'
import {
    mockFunction,
    waitForLoading,
} from '../../../__test_utils__/testHelpers'
import IntegrationDetails from '../../../components/integration/IntegrationDetails'
import { i18n } from '../../../i18n'
import { FeatureFlagProvider } from '../../../components/feature/featureflags'
import { defaultFeatures } from '../../../components/feature/featureContext'

jest.mock('../../../data_sources/api')
i18n.mockT()

describe('<IntegrationDetails />', () => {
    let mockedIntegration = {} as IIntegration
    const getIntegrationMock = mockFunction(api.getIntegration)
    const getPersonTypes = mockFunction(api.getPersonTypes)

    beforeEach(() => {
        mockedIntegration = getMockedIntegration()
    })

    it('renders successfully with existing Integration', async () => {
        getIntegrationMock.mockResolvedValueOnce(mockedIntegration)
        getPersonTypes.mockResolvedValue([])
        renderWithKeycloak(() => (
            <MockOneplaceLibraryContext>
                <FeatureFlagProvider
                    features={{
                        features: {
                            ...defaultFeatures.features,
                            usePeople: true,
                        },
                    }}
                >
                    <MemoryRouter>
                        <Route
                            render={(props) => {
                                props.location.pathname = `/integrations/${mockedIntegration.id}`
                                props.match = {
                                    path: '/integrations/:id',
                                    url: `/integrations/${mockedIntegration.id}`,
                                    params: { id: `${mockedIntegration.id}` },
                                    isExact: true,
                                }
                                return (
                                    <IntegrationDetails
                                        {...(props as RouteComponentProps<{
                                            id: string
                                        }>)}
                                    />
                                )
                            }}
                        />
                    </MemoryRouter>
                </FeatureFlagProvider>
            </MockOneplaceLibraryContext>
        ))

        await waitForLoading()
        //screen.debug(undefined, Infinity)
        expect(getIntegrationMock).toHaveBeenCalledWith(mockedIntegration.id)
        expect(
            screen.getByDisplayValue(mockedIntegration.name)
        ).toBeInTheDocument()

        mockedIntegration.fieldMappings.forEach((fm) => {
            expect(
                screen.getAllByText(
                    fm.field.required ? `${fm.field.label}*` : fm.field.label
                )
            ).toBeDefined()
        })

        expect(screen.queryAllByText('[New Custom Field]').length).toBe(
            mockedIntegration.fieldMappings.filter(
                (fm) => fm.field.hasCustomField
            ).length
        )

        expect(screen.getByText('Save')).not.toBeDisabled()
    })

    it('renders successfully with new Integration', async () => {
        const newIntegrationMock = mockFunction(api.getNewIntegration)
        newIntegrationMock.mockResolvedValueOnce(getNewMockedIntegration())
        getPersonTypes.mockResolvedValue([])
        renderWithKeycloak(() => (
            <MockOneplaceLibraryContext>
                <MemoryRouter>
                    <Route
                        render={(props) => {
                            props.location.pathname = '/integrations/-1'
                            props.match = {
                                path: '/integrations/:id',
                                url: '/integrations/-1',
                                params: { id: '-1' },
                                isExact: true,
                            }
                            return (
                                <IntegrationDetails
                                    {...(props as RouteComponentProps<{
                                        id: string
                                    }>)}
                                />
                            )
                        }}
                    />
                </MemoryRouter>
            </MockOneplaceLibraryContext>
        ))

        await waitForLoading()
        expect(newIntegrationMock).toHaveBeenCalledTimes(1)
        expect(screen.getByText('Save')).not.toBeDisabled()
    })

    it('renders successfully in read-only mode', async () => {
        getIntegrationMock.mockResolvedValueOnce({
            ...mockedIntegration,
            status: 'inactive',
        })
        getPersonTypes.mockResolvedValue([])
        renderWithKeycloak(() => (
            <MockOneplaceLibraryContext>
                <MemoryRouter>
                    <Route
                        render={(props) => {
                            props.location.pathname = `/integrations/${mockedIntegration.id}`
                            props.match = {
                                path: '/integrations/:id',
                                url: `/integrations/${mockedIntegration.id}`,
                                params: { id: `${mockedIntegration.id}` },
                                isExact: true,
                            }
                            return (
                                <IntegrationDetails
                                    {...(props as RouteComponentProps<{
                                        id: string
                                    }>)}
                                />
                            )
                        }}
                    />
                </MemoryRouter>
            </MockOneplaceLibraryContext>
        ))

        await waitForLoading()
        expect(getIntegrationMock).toHaveBeenCalledTimes(1)
        expect(screen.getByDisplayValue(mockedIntegration.name)).toBeDisabled()
        expect(screen.queryByText('Save')).not.toBeInTheDocument()
    })
})

function getMockedIntegration() {
    return {
        id: 99,
        name: 'My Integration',
        authDetails: [
            {
                id: 99,
                username: 'leandro',
                password: '123',
                url: '/test',
            },
        ],
        syncLocation: true,
        useSiteAsLocation: false,
        syncStaff: true,
        syncChildren: true,
        allowCreatingLocation: true,
        lastSyncDate: new Date(),
        status: 'active',
        app: {
            id: 1,
            name: 'Infocare',
            hasPeopleSync: true,
            hasStaffSync: true,
        },
        schedules: [{ id: -1, cronValue: '0 30 15 * * ?' }],
        fieldMappings: [
            // CHILD
            {
                id: 1001,
                integrationId: 99,
                field: {
                    hasCustomField: false,
                    id: 121,
                    label: 'Child Key',
                    name: 'CHILD_KEY',
                    order: 1,
                    path: 'child_key',
                    required: true,
                    type: 'CHILD',
                },
                selected: true,
            },
            {
                id: 1002,
                integrationId: 99,
                selected: true,
                field: {
                    hasCustomField: false,
                    id: 122,
                    label: 'First Name',
                    name: 'FIRST_NAME',
                    order: 2,
                    path: 'first_name',
                    required: true,
                    type: 'CHILD',
                },
            },
            {
                id: 1003,
                integrationId: 99,
                customFieldId: 12345,
                selected: true,
                field: {
                    hasCustomField: true,
                    id: 134,
                    label: 'Residential City',
                    name: 'RESIDENTIAL_CITY',
                    order: 14,
                    path: 'residential_city',
                    required: false,
                    type: 'CHILD',
                },
            },
            // STAFF
            {
                id: 1004,
                integrationId: 99,
                selected: true,
                field: {
                    hasCustomField: false,
                    id: 180,
                    label: 'Staff Key',
                    name: 'STAFF_KEY',
                    order: 1,
                    path: 'staff_key',
                    required: true,
                    type: 'STAFF',
                },
            },
            {
                id: 1005,
                integrationId: 99,
                customFieldId: 54321,
                selected: true,
                field: {
                    hasCustomField: false,
                    id: 184,
                    label: 'Email',
                    name: 'EMAIL',
                    order: 5,
                    path: 'email',
                    required: false,
                    type: 'STAFF',
                },
            },
            {
                id: 1006,
                integrationId: 99,
                customFieldId: 56789,
                selected: true,
                field: {
                    hasCustomField: true,
                    id: 188,
                    label: 'Gender',
                    name: 'GENDER',
                    order: 9,
                    path: 'gender',
                    required: false,
                    type: 'STAFF',
                },
            },
            // CENTER
            {
                id: 1007,
                integrationId: 99,
                selected: true,
                field: {
                    hasCustomField: false,
                    id: 226,
                    label: 'Name',
                    name: 'NAME',
                    order: 2,
                    path: 'name',
                    required: true,
                    type: 'CENTER',
                },
            },
            {
                id: 1008,
                integrationId: 99,
                customFieldId: 98765,
                selected: true,
                field: {
                    hasCustomField: true,
                    id: 241,
                    label: 'Manager',
                    name: 'MANAGER',
                    order: 17,
                    path: 'manager',
                    required: false,
                    type: 'CENTER',
                },
            },
            {
                id: 1009,
                integrationId: 99,
                customFieldId: 112233,
                selected: true,
                field: {
                    hasCustomField: true,
                    id: 244,
                    label: 'Winz Number',
                    name: 'WINZ_NUMBER',
                    order: 20,
                    path: 'winz_number',
                    required: false,
                    type: 'CENTER',
                },
            },
        ],
    } as IIntegration
}

function getNewMockedIntegration() {
    return {
        name: '',
        authDetails: [
            {
                username: '',
                password: '',
                url: '',
            },
        ],
        syncLocation: false,
        useSiteAsLocation: false,
        syncStaff: false,
        syncChildren: false,
        allowCreatingLocation: false,
        status: 'active',
        app: {
            id: 1,
            name: 'Infocare',
        },
        schedules: [{ id: -1, cronValue: '0 30 15 * * ?' }],
        fieldMappings: [...getMockedIntegration().fieldMappings],
    } as IIntegration
}
