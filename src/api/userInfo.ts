import { fetchWithErrorHandling } from '../common'
import { ICapabilities, IFeatureFlagsProps } from '../feature/featureContext'

function wait<T>(ms: number, value: T) {
    return new Promise<T>((resolve) => setTimeout(resolve, ms, value))
}

export const mockUser = async () => {
    const mockUser = {
        franchiseId: 12434652,
        franchiseDashboard: true,
        myFranchisees: true,
        franchiseeOverview: true,
        checklists: true,
        notes: true,
        customers: false,
        leads: false,
        quotes: false,
        invoices: false,
        sites: true,
        tickets: true,
        franchiseMytickets: true,
        hsFranchiseeMenu: false,
        hsMainMenu: true,
        franchiseHazards: true,
        superuser: true,
        updateTicketEmailField: true,
        franchiseSettings: true,
        retailOrganisation: true,
        usePeople: true,
        peopleReadOnly: false,
        hidePeopleManager: false,
        usePhotoGallery: true,
        updateHazard: true,
        useAutocomplete: false,
        completeIncidentMode: false,
        ticketOnlyInApp: false,
        ticketCategoryCheckInOtherTickets: false,
        useTicketType: true,
        updateTicketSubject: false,
        cancelTicket: true,
        username: 'Dennis Branding',
        locale: 'en_NZ',
        timeZone: 'Pacific/Auckland',
        dateFormat: 'd/MM/yyyy',
        dateTimeFormat: 'd/MM/yyyy hh:mm:ss a',
        createdAt: '1365134274',
        companyName: 'SiteDemo',
        industry: 'Accommodation',
        advisorCode: 'AD00004X8',
        planType: 'Legacy',
        profile: 'Super',
        operatorId: 12434657,
        hideFranchiseeManager: false,
        franchiseeReadOnly: false,
        hideSiteManager: false,
        siteReadOnly: false,
        // incidentCategoryStreamLine: true,
        pageSize: 20,
        // hideCreateChecklistSchedule: true,
        // hideCreateChecklistTemplate: true,
        // partnerPortal: true,
    }
    return await wait(0, mockUser)
}

export async function fetchUserInfo(): Promise<any> {
    return mockUser()
    return fetchWithErrorHandling<any>('GET', 'checklists')
}
