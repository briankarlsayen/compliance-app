import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { MemoryRouter, Route, RouteComponentProps } from 'react-router-dom'
import * as api from '../../../data_sources/api'
import {
    IEmailFields,
    IEmailTemplate,
    MockOneplaceLibraryContext,
} from 'oneplace-components'
import {
    mockFunction,
    waitForLoading,
} from '../../../__test_utils__/testHelpers'
import EmailTemplateDetails from '../../../components/email-template/EmailTemplateDetails'
import { i18n } from 'oneplace-components'
import { FeatureFlagProvider } from '../../../components/feature/featureflags'
import { defaultFeatures } from '../../../components/feature/featureContext'

jest.mock('../../../data_sources/api')
i18n.mockT()

describe('<EmailTemplateDetails />', () => {
    let mockedEmailTemplate = {} as IEmailTemplate
    const getEmailTemplateMock = mockFunction(api.getEmailTemplate)
    const loadDefaultTemplateMock = mockFunction(
        api.getIncidentDefaultEmailTemplate
    )
    const getIncidentTypesWithNoEmailTemplateMock = mockFunction(
        api.getIncidentTypesWithNoEmailTemplate
    )

    beforeEach(() => {
        mockedEmailTemplate = getMockedEmailTemplate()
    })

    it('renders successfully with existing EmailTemplate', async () => {
        getEmailTemplateMock.mockResolvedValueOnce(mockedEmailTemplate)
        loadDefaultTemplateMock.mockResolvedValueOnce(
            getMocketDefaultTemplate()
        )
        getIncidentTypesWithNoEmailTemplateMock.mockResolvedValue(
            getIncidentTypes()
        )

        renderWithKeycloak(() => (
            <MockOneplaceLibraryContext>
                <FeatureFlagProvider
                    features={{
                        features: {
                            ...defaultFeatures.features,
                        },
                    }}
                >
                    <MemoryRouter>
                        <Route
                            render={(props) => {
                                props.location.pathname = `/email-templates/${mockedEmailTemplate.id}`
                                props.match = {
                                    path: '/email-templates/:id',
                                    url: `/email-templates/${mockedEmailTemplate.id}`,
                                    params: { id: `${mockedEmailTemplate.id}` },
                                    isExact: true,
                                }
                                return (
                                    <EmailTemplateDetails
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
        expect(getEmailTemplateMock).toHaveBeenCalledWith(
            mockedEmailTemplate.id
        )
        expect(getIncidentTypesWithNoEmailTemplateMock).toHaveBeenCalledTimes(1)
        expect(loadDefaultTemplateMock).not.toHaveBeenCalled()

        expect(
            screen.getByDisplayValue(mockedEmailTemplate.name)
        ).toBeInTheDocument()
        expect(
            screen.getByDisplayValue(mockedEmailTemplate.subject)
        ).toBeInTheDocument()
        expect(
            screen.getByDisplayValue(mockedEmailTemplate.body)
        ).toBeInTheDocument()

        expect(screen.queryAllByText(/Incident Type/)).toHaveLength(3)
        expect(screen.queryAllByText(/Another Incident Type/)).toHaveLength(0)
    })

    it('renders successfully with new EmailTemplate', async () => {
        getEmailTemplateMock.mockResolvedValueOnce(mockedEmailTemplate)
        loadDefaultTemplateMock.mockResolvedValueOnce(
            getMocketDefaultTemplate()
        )
        getIncidentTypesWithNoEmailTemplateMock.mockResolvedValue(
            getIncidentTypes()
        )

        renderWithKeycloak(() => (
            <MockOneplaceLibraryContext>
                <MemoryRouter>
                    <Route
                        render={(props) => {
                            props.location.pathname = '/email-templates/new'
                            props.match = {
                                path: '/email-templates/:id',
                                url: '/email-templates/new',
                                params: { id: 'new' },
                                isExact: true,
                            }
                            return (
                                <EmailTemplateDetails
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

        expect(getEmailTemplateMock).not.toHaveBeenCalled()
        expect(getIncidentTypesWithNoEmailTemplateMock).toHaveBeenCalledTimes(1)
        expect(loadDefaultTemplateMock).toHaveBeenCalled()

        expect(
            screen.getByDisplayValue(getMocketDefaultTemplate().subject)
        ).toBeInTheDocument()
        expect(
            screen.getByDisplayValue(getMocketDefaultTemplate().message)
        ).toBeInTheDocument()
    })

    it('saves when clicked button', async () => {
        getEmailTemplateMock.mockResolvedValueOnce(mockedEmailTemplate)
        loadDefaultTemplateMock.mockResolvedValueOnce(
            getMocketDefaultTemplate()
        )
        getIncidentTypesWithNoEmailTemplateMock.mockResolvedValue(
            getIncidentTypes()
        )

        const saveEmailTemplateMock = mockFunction(api.saveEmailTemplate)

        renderWithKeycloak(() => (
            <MockOneplaceLibraryContext>
                <MemoryRouter>
                    <Route
                        render={(props) => {
                            props.location.pathname = `/email-templates/${mockedEmailTemplate.id}`
                            props.match = {
                                path: '/email-templates/:id',
                                url: `/email-templates/${mockedEmailTemplate.id}`,
                                params: { id: `${mockedEmailTemplate.id}` },
                                isExact: true,
                            }
                            return (
                                <EmailTemplateDetails
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

        fireEvent(
            screen.getByText('Save'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        await waitForLoading()
        expect(saveEmailTemplateMock).toHaveBeenCalled()
    })
})

function getMockedEmailTemplate() {
    return {
        id: 99,
        name: 'My EmailTemplate',
        type: 'incident',
        subject: 'My Subject',
        body: 'My Body',
        attachLogo: true,
        incidentTypes: [
            { id: 1, name: 'Incident Type 1' },
            { id: 2, name: 'Incident Type 2' },
            { id: 3, name: 'Incident Type 3' },
        ],
    } as IEmailTemplate
}

function getMocketDefaultTemplate() {
    return {
        subject: 'My Subject Template',
        message: 'My Message Template',
    } as IEmailFields
}

function getIncidentTypes() {
    return [
        { id: 10, name: 'Another Incident Type A' },
        { id: 11, name: 'Another Incident Type B' },
        { id: 12, name: 'Another Incident Type C' },
    ]
}
