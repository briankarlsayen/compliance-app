import { createContext } from 'react'

export interface ICapabilities {
    hsMainMenu: boolean
    franchiseDashboard: boolean
    hidePeopleManager: boolean
    createdAt: string
    myFranchisees: boolean
    hideFranchiseeManager: boolean
    ticketOnlyInApp: boolean
    hsFranchiseeMenu: boolean
    quotes: boolean
    updateTicketEmailField: boolean
    locale: string
    useAutocomplete: boolean
    profile: string
    operatorId: number
    siteReadOnly: boolean
    customers: boolean
    cancelTicket: boolean
    franchiseSettings: boolean
    industry: string
    updateTicketSubject: boolean
    tickets: boolean
    leads: boolean
    checklists: boolean
    sites: boolean
    hideSiteManager: boolean
    franchiseId: number
    useTicketType: boolean
    dateTimeFormat: string
    username: string
    franchiseeReadOnly: boolean
    retailOrganisation: boolean
    franchiseMytickets: boolean
    superuser: boolean
    peopleReadOnly: boolean
    updateHazard: boolean
    timeZone: string
    franchiseHazards: boolean
    planType: string
    dateFormat: string
    ticketCategoryCheckInOtherTickets: boolean
    franchiseeOverview: boolean
    invoices: boolean
    usePhotoGallery: boolean
    usePeople: boolean
    notes: boolean
    completeIncidentMode: boolean
    companyName: string
    advisorCode: string
    pageSize: number
    hideCreateChecklistSchedule: boolean
    hideCreateChecklistTemplate: boolean
    partnerPortal: boolean
}

export interface IFeatureFlagsProps {
    features: ICapabilities
}
export const defaultFeatures: IFeatureFlagsProps = {
    features: {
        hsMainMenu: false,
        franchiseDashboard: false,
        hidePeopleManager: true,
        createdAt: '',
        myFranchisees: false,
        hideFranchiseeManager: true,
        ticketOnlyInApp: false,
        hsFranchiseeMenu: false,
        quotes: false,
        updateTicketEmailField: false,
        locale: 'en',
        useAutocomplete: false,
        profile: '',
        operatorId: 0,
        siteReadOnly: true,
        customers: false,
        cancelTicket: false,
        franchiseSettings: false,
        industry: '',
        updateTicketSubject: false,
        tickets: false,
        leads: false,
        checklists: false,
        sites: false,
        hideSiteManager: false,
        franchiseId: 0,
        useTicketType: false,
        dateTimeFormat: 'd/MM/yyyy hh:mm:ss a',
        username: '',
        franchiseeReadOnly: true,
        retailOrganisation: true,
        franchiseMytickets: false,
        superuser: false,
        peopleReadOnly: false,
        updateHazard: false,
        timeZone: '',
        franchiseHazards: false,
        planType: 'Legacy',
        dateFormat: 'd/MM/yyyy',
        ticketCategoryCheckInOtherTickets: false,
        franchiseeOverview: false,
        invoices: false,
        usePhotoGallery: false,
        usePeople: false,
        notes: false,
        completeIncidentMode: false,
        companyName: '',
        advisorCode: '',
        pageSize: 8,
        hideCreateChecklistTemplate: false,
        hideCreateChecklistSchedule: false,
        partnerPortal: true,
    },
}
const FeatureFlagsContext = createContext<IFeatureFlagsProps>(defaultFeatures)
export default FeatureFlagsContext
