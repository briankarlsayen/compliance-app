import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import EmailTemplateListing from '../../../components/email-template/EmailTemplateListing'
import { MemoryRouter, Route } from 'react-router-dom'
import * as api from '../../../data_sources/api'
import {
    i18n,
    IEmailTemplate,
    MockOneplaceLibraryContext,
} from 'oneplace-components'
import {
    mockFunction,
    waitForLoading,
} from '../../../__test_utils__/testHelpers'
import { queryActions } from '../../../constants'
import { FeatureFlagProvider } from '../../../components/feature/featureflags'
import { defaultFeatures } from '../../../components/feature/featureContext'

jest.mock('../../../data_sources/api')
i18n.mockT()

describe('<EmailTemplateListing />', () => {
    const getEmailTemplatesMock = mockFunction(api.getEmailTemplates)
    const mockedEmailTemplates = getMockedEmailTemplates()

    it('renders successfully', async () => {
        getEmailTemplatesMock.mockResolvedValue(getMockedEmailTemplates())

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
                        <EmailTemplateListing />
                    </MemoryRouter>
                </FeatureFlagProvider>
            </MockOneplaceLibraryContext>
        ))

        await waitForLoading()
        //screen.debug()
        expect(getEmailTemplatesMock).toHaveBeenCalledTimes(1)
        expect(screen.queryAllByRole('cell')).toHaveLength(6)
        expect(screen.queryAllByText('Delete')).toHaveLength(2)
        expect(
            screen.queryAllByText(mockedEmailTemplates[0].name)
        ).toBeDefined()
        expect(
            screen.queryAllByText(mockedEmailTemplates[1].name)
        ).toBeDefined()
    })

    it('shows message after saving details page', async () => {
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
                                props.history.location.search = `?action=${queryActions.SAVED}`
                                return <EmailTemplateListing />
                            }}
                        />
                    </MemoryRouter>
                </FeatureFlagProvider>
            </MockOneplaceLibraryContext>
        ))
        await waitForLoading()
        expect(
            screen.getByText('Email Template saved successfully!')
        ).toBeInTheDocument()
    })

    it('deletes email template', async () => {
        getEmailTemplatesMock.mockResolvedValue(getMockedEmailTemplates())
        const deleteEmailTemplateMock = mockFunction(api.deleteEmailTemplate)

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
                        <EmailTemplateListing />
                    </MemoryRouter>
                </FeatureFlagProvider>
            </MockOneplaceLibraryContext>
        ))

        await waitForLoading()
        fireEvent.click(screen.getAllByText('Delete')[0])
        await waitForLoading()
        expect(deleteEmailTemplateMock).toHaveBeenCalledTimes(1)
    })
})

function getMockedEmailTemplates() {
    return [
        {
            id: 99,
            name: 'My EmailTemplate',
            type: 'incident',
            subject: 'My Subject',
            body: 'My Body',
            attachLogo: true,
        },
        {
            id: 100,
            name: 'My EmailTemplate 2',
            type: 'incident',
            subject: 'My Subject 2',
            body: 'My Body 2',
            attachLogo: false,
        },
    ] as IEmailTemplate[]
}
