import { fetchWithErrorHandling } from '../common'
import { ICheckListData } from '../pages/Checklists'
import { IScheduleData } from '../pages/Schedules'
import { ISurvey } from '../pages/Survey'
import franchisees from './franchisees'
import alias from './alias'
import dayjs from 'dayjs'
import { IScheduleRequest } from '../pages/ScheduleFormContainer'

function wait<T>(ms: number, value: T) {
    return new Promise<T>((resolve) => setTimeout(resolve, ms, value))
}

export const mockChecklist = async () => {
    const mockData: ICheckListData[] = [
        {
            id: 1,
            name: '1Place Standard Centre Closing Procedure // v1.1',
            schedules: 3,
            template: 'form',
            recStatus: 'inactive',
            adhoc: true,
        },
        {
            id: 2,
            name: '1Place Standard Centre Closing Procedure // v1.2',
            schedules: 4,
            template: 'form',
            recStatus: 'active',
            adhoc: false,
        },
        {
            id: 3,
            name: '1Place Standard Centre Closing Procedure // v1.3',
            schedules: 5,
            template: 'partner',
            recStatus: 'active',
            adhoc: false,
        },
        {
            id: 4,
            name: '1Place Standard Centre Closing Procedure // v1.4',
            schedules: 1,
            template: 'form',
            recStatus: 'inactive',
            adhoc: true,
        },
        {
            id: 5,
            name: '1Place Standard Centre Closing Procedure // v1.5',
            schedules: 8,
            template: 'form',
            recStatus: 'inactive',

            adhoc: true,
        },
        {
            id: 6,
            name: '1Place Standard Centre Closing Procedure // v1.6',
            schedules: 9,
            template: 'partner',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 7,
            name: '1Place Standard Centre Closing Procedure // v1.7',
            schedules: 11,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 8,
            name: '1Place Standard Centre Closing Procedure // v1.8',
            schedules: 2,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 9,
            name: '1Place Standard Centre Closing Procedure // v1.9',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 10,
            name: '1Place Standard Centre Closing Procedure // v1.10',
            schedules: 8,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 11,
            name: '1Place Standard Centre Closing Procedure // v1.11',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 12,
            name: '1Place Standard Centre Closing Procedure // v1.12',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 13,
            name: '1Place Standard Centre Closing Procedure // v1.13',
            schedules: 6,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 14,
            name: '1Place Standard Centre Closing Procedure // v1.14',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 15,
            name: '1Place Standard Centre Closing Procedure // v1.15',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
        {
            id: 16,
            name: '1Place Standard Centre Closing Procedure // v1.16',
            schedules: 4,
            template: 'form',
            recStatus: 'active',
            adhoc: true,
        },
    ]
    const newMock = [
        {
            id: 1,
            name: 'Mock',
            recrecStatus: 'active',
            schedules: 3,
            template: 'form',
            adhoc: true,
        },
        {
            id: 2,
            name: 'Mock1',
            recrecStatus: 'active',
            schedules: 3,
            template: 'form',
            adhoc: true,
        },
    ]
    return await wait(0, newMock)
}

export const mockSchedule = async () => {
    const mockSchedules: IScheduleData[] = [
        {
            id: 1,
            name: 'Documentation 1',
            showOverdue: true,
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
            event: {
                startDate: '04-24-2023',
                rRule: 'FREQ=DAILY;UNTIL=20200524T000000Z',
                rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020',
            },
        },
    ]

    const realData = [
        {
            entities: ['darrell'],
            event: {
                gracePeriod: 0,
                id: 4602,
                rRule: 'FREQ=DAILY;UNTIL=20200524T000000Z',
                rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020',
                startDate: '2020-05-24',
            },
            id: 4167,
            name: 'until / test',
            showOverdue: true,
        },
    ]
    return await wait(0, realData)
}

export const mockSurvey = async () => {
    const mockSchedules: ISurvey[] = [
        {
            id: 1,
            name: 'Survey 1',
            expiry_date: '04-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '0KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 2,
            name: 'Survey 2',
            expiry_date: '01-04-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '1KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 3,
            name: 'Survey 3',
            expiry_date: '05-11-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '2KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 4,
            name: 'Survey 4',
            expiry_date: '04-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 12',
            ],
        },
        {
            id: 5,
            name: 'Survey 5',
            expiry_date: '05-14-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 6,
            name: 'Survey 6',
            expiry_date: '01-21-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 7,
            name: 'Survey 7',
            expiry_date: '04-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
            ],
        },
        {
            id: 8,
            name: 'Survey 8',
            expiry_date: '01-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 9,
            name: 'Survey 9',
            expiry_date: '03-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 10,
            name: 'Survey 10',
            expiry_date: '04-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 11,
            name: 'Survey 11',
            expiry_date: '01-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 12,
            name: 'Survey 12',
            expiry_date: '01-14-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 6',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 13,
            name: 'Survey 13',
            expiry_date: '04-04-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 4',
                'User 5',
                'User 6',
                'User 7',
                'User 8',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
        {
            id: 14,
            name: 'Survey 14',
            expiry_date: '04-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: ['User 1'],
        },
        {
            id: 15,
            name: 'Survey 15',
            expiry_date: '04-21-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 9',
                'User 10',
                'User 11',
                'User 12',
            ],
        },
    ]

    const data = {
        entities: [
            'Henderson Rd',
            'Andrew Simms Newmarket',
            'Andrew Simms Botany',
            'external id 2',
            'good site',
        ],
        id: 57,
        name: '1',
        qrCodeLink:
            'http://localhost:8280/api/checklist-templates/12634620/surveys/57/qrcode.png',
        surveyUrl: 'http://localhost:3000/pa/D1UodAaOfH8M0Rb7Ovk4I',
    }

    return await wait(1000, mockSchedules)
}

export const mockFranchisee = async () => {
    const franchiseeList = [
        {
            id: 1,
            name: 'Norbert',
        },
        {
            id: 2,
            name: 'Dameon',
        },
        {
            id: 3,
            name: 'Nicholaus',
        },
    ]
    return await wait(0, franchiseeList)
}

export const mockAlias = async () => {
    return await wait(0, alias)
}

export const mockSurveyDetails = async () => {
    return {
        id: 57,
        name: '1',
        noOfTextFields: 1,
        qrCode: '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',
        surveyUrl: 'http://localhost:3000/pa/D1UodAaOfH8M0Rb7Ovk4I',
        welcomeMessage: 'Welcome, Please select an option',
        entities: [
            {
                id: 1,
                name: 'Henderson Rd',
            },
            {
                id: 2,
                name: 'Andrew Simms Newmarket',
            },
            {
                id: 3,
                name: 'Andrew Simms Botany',
            },
            {
                id: 4,
                name: 'external id 2',
            },
            {
                id: 5,
                name: 'good site',
            },
            {
                id: 6,
                name: 'new site alias test',
            },
        ],
        toRecipients: [
            {
                id: 1,
                name: 'darrell@1placeonline.com',
            },
            {
                id: 2,
                name: 'darrell_wu@yahoo.co.nz',
            },
        ],
    }

    return {
        id: 17,
        alias: ['Alias4'],
        expiry_date: dayjs('2000-12-12'),
        link: 'http://localhost:3000/pa/2Kl40jChHRGyp0mtgg9tal',
        name: 'survery 1',
        selected_sites: [],
        survey_for: 1,
        survey_to: [
            {
                id: 1,
                name: 'Email',
            },
            {
                id: 2,
                name: 'Email2',
            },
        ],
        text_form_name: 'hello my friend',
        welcome_msg: 'Hello world',
        entities: [
            {
                id: 1,
                name: 'User1',
            },
            {
                id: 2,
                name: 'User2',
            },
        ],
        qrCodeLink:
            'https://fastly.picsum.photos/id/894/200/200.jpg?hmac=h3PvihhxRrUznPuW-OPbq7zxa0On5jLsyYbWwI6nW6w',
        qr_image:
            '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',
    }
}

// checklistType: 'site',
// entities: ['Andrew Simms Newmarket', 'Andrew Simms Botany'],
// expiryDate: '2020-06-29',
// id: 17,
// noOfTextFields: 1,
// qrCode: ,
// surveyUrl: 'http://localhost:3000/pa/2Kl40jChHRGyp0mtgg9tal',
// toRecipients: [],
// name: "survery 1"

export const mockVersion = async () => {
    const mockVersions = [
        {
            createdDate: '10/05/2023 9:36:27AM',
            version: '1-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '10/05/2023 9:36:27AM',
            version: '1-draft-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '09/05/2023 9:36:27AM',
            version: '2-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '10/05/2023 9:36:27AM',
            version: '3-draft',
            recStatus: 'Published',
            creator: '1Place User',
        },
        {
            createdDate: '10/05/2023 9:36:27AM',
            version: '4-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '01/05/2023 9:36:27AM',
            version: '5-draft',
            recStatus: 'Archived',
            creator: '1Place User',
        },
        {
            createdDate: '10/01/2023 9:36:27AM',
            version: '6-draft',
            recStatus: 'Archived',
            creator: '1Place User',
        },
        {
            createdDate: '11/01/2023 9:36:27AM',
            version: '7-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '11/25/2023 9:36:27AM',
            version: '8-draft',
            recStatus: 'Published',
            creator: '1Place User',
        },
        {
            createdDate: '09/01/2023 9:36:27AM',
            version: '9-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '10/22/2023 9:36:27AM',
            version: '10-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '11/05/2023 9:36:27AM',
            version: '11-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
        {
            createdDate: '01/11/2023 9:36:27AM',
            version: '12-draft',
            recStatus: 'Draft',
            creator: '1Place User',
        },
    ]
    return await wait(1000, mockVersions)
}

export const mockPromotionDetails = async () => {
    const promotionDetails = {
        name: 'Final Draft',
        commission: '',
    }
    return await wait(1000, promotionDetails)
}

export const mockRegister = async () => {
    const registerDetails = [
        {
            id: 1,
            centre: '1Place User',
            room: 'Room1',
            name: 'User 1',
            template: 'Template 1',
            createdDate: '5/06/2023',
            creator: 'User 1',
            ticket: '743',
            score: '0/6',
            complete: false,
            isLocked: true,
        },
        {
            id: 2,
            centre: 'Head Office',
            room: 'Room2',
            name: 'User 2',
            template: 'Template 2',
            createdDate: '5/06/2023',
            creator: 'User 2',
            ticket: '743',
            score: '0/12',
            complete: false,
            isLocked: false,
        },
        {
            id: 3,
            centre: '1Place User',
            room: 'Room3',
            name: 'User 3',
            template: 'Template 3',
            createdDate: '5/06/2023',
            creator: 'User 3',
            ticket: '713',
            score: '0/3',
            complete: true,
            isLocked: true,
        },
        {
            id: 4,
            centre: '1Place User',
            room: 'Room4',
            name: 'User 4',
            template: 'Template 4',
            createdDate: '5/06/2023',
            creator: 'User 4',
            ticket: '723',
            score: '0/3',
            complete: false,
            isLocked: false,
        },
        {
            id: 5,
            centre: '1Place User',
            room: 'Room5',
            name: 'User 5',
            template: 'Template 5',
            createdDate: '5/06/2023',
            creator: 'User 5',
            ticket: '865',
            score: '0/6',
            complete: false,
            isLocked: false,
        },
        {
            id: 6,
            centre: 'Head Office',
            room: 'Room6',
            name: 'User 6',
            template: 'Template 6',
            createdDate: '5/06/2023',
            creator: 'User 6',
            ticket: '111',
            score: '0/11',
            complete: false,
            isLocked: true,
        },
        {
            id: 7,
            centre: '1Place User',
            room: 'Room7',
            name: 'User 7',
            template: 'Template 7',
            createdDate: '5/06/2023',
            creator: 'User 7',
            ticket: '753',
            score: '0/2',
            complete: true,
            isLocked: false,
        },
        {
            id: 8,
            centre: '1Place User',
            room: 'Room8',
            name: 'User 8',
            template: 'Template 8',
            createdDate: '5/06/2023',
            creator: 'User 8',
            ticket: '512',
            score: '0/8',
            complete: false,
            isLocked: false,
        },
    ]
    return await wait(1000, registerDetails)
}

export const mockReasignChecklist = async () => {
    const reassignChecklist = [
        {
            centre: '1Place User',
            room: 'Room1',
            label: 'User 1',
            complete: false,
        },
        {
            centre: 'Head Office',
            room: 'Room2',
            label: 'User 2',
            complete: false,
        },
        {
            centre: '1Place User',
            room: 'Room3',
            label: 'User 3',
            complete: true,
        },
        {
            centre: '1Place User',
            room: 'Room4',
            label: 'User 4',
            complete: false,
        },
        {
            centre: '1Place User',
            room: 'Room5',
            label: 'User 5',
            complete: false,
        },
        {
            centre: 'Head Office',
            room: 'Room6',
            label: 'User 6',
            complete: false,
        },
        {
            centre: '1Place User',
            room: 'Room7',
            label: 'User 7',
            complete: true,
        },
        {
            centre: '1Place User',
            room: 'Room8',
            label: 'User 8',
            complete: false,
        },
    ]
    return await wait(1000, reassignChecklist)
}

export const mockScheduleDetails = async () => {
    return {
        checklistType: 'site',
        emailNotification: false,
        entities: ['darrell'],
        event: {
            gracePeriod: 0,
            id: 4602,
            rRule: 'FREQ=DAILY;UNTIL=20200524T000000Z;INTERVAL=2',
            rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020',
            startDate: '2020-05-24',
        },
        id: 4167,
        name: 'until / test',
        showOverdue: true,
        futureDatesOnly: false,
        historicEvents: [],
        sites: [
            {
                id: 12587549,
                name: 'darrell wu',
            },
        ],
    }
}

export async function updateChecklist(checklist: any): Promise<any> {
    return fetchWithErrorHandling<any>(
        'PUT',
        'checklist/' + checklist.id,
        JSON.stringify(checklist)
    )
}

export async function fetchChecklist(): Promise<any> {
    return mockChecklist()
}

export async function fetchSchedule(id: number): Promise<any> {
    return mockSchedule()
}

export async function fetchScheduleDetails(
    tempid: number,
    id: number
): Promise<any> {
    return mockScheduleDetails()
}

export async function updateSchedule(tempid: number, id: number): Promise<any> {
    const url = `/checklist-templates/${tempid}/schedules/${id}`
    return { message: 'Success' }
}

export async function fetchSurvey(): Promise<any> {
    return mockSurvey()
}

export async function fetchFranchisee(): Promise<any> {
    return mockFranchisee()
}

export async function fetchAlias(): Promise<any> {
    return mockAlias()
}

export async function fetchSurveyDetails(
    tempid: number,
    id: number
): Promise<any> {
    return mockSurveyDetails()
}

export async function fetchVersions(): Promise<any> {
    return mockVersion()
}

export async function fetchPromotionDetails(): Promise<any> {
    return mockPromotionDetails()
}
export async function fetchRegisters(): Promise<any> {
    return mockRegister()
}

export async function fetchReassignChecklist(): Promise<any> {
    return mockReasignChecklist()
}

export async function createSchedule(data: IScheduleRequest): Promise<any> {
    const baseUrl = '/checklist-templates/12633756/schedules/'
    const body = {
        name: 'new schedule',
        checklistType: 'site',
        sites: [
            {
                id: 12435196,
                name: 'Queensgate',
            },
            {
                id: 12435185,
                name: 'Henderson Rd',
            },
            {
                id: 12547893,
                name: 'Four Square - Thames',
            },
            {
                id: 12435195,
                name: 'Botany site',
            },
            {
                id: 12435199,
                name: 'Riccarton (Chch)',
            },
            {
                id: 12547667,
                name: '11111111',
            },
            {
                id: 12448162,
                name: 'Christchurch ',
            },
            {
                id: 12499656,
                name: 'test',
            },
            {
                id: 12525635,
                name: 'a1',
            },
            {
                id: 12533314,
                name: 'Dryer (Gas) - Electrolux Wascator T3530',
            },
            {
                id: 12540726,
                name: 'Gazley Motors',
            },
            {
                id: 12540725,
                name: 'Andrew Simms Botany',
            },
            {
                id: 12533316,
                name: 'Washer Fisher & Paykel Quicksmart',
            },
            {
                id: 12540727,
                name: 'Euromarque',
            },
            {
                id: 12540724,
                name: 'Andrew Simms Newmarket',
            },
            {
                id: 12533318,
                name: '(Eq) Washer Paul Newcombe Electrolux FLE 22',
            },
            {
                id: 12533319,
                name: '(Eq) Dryer Paul Newcombe ADC ADE 75',
            },
        ],
        event: {
            id: 3257,
            startDate: '2017-08-23',
            rRule: 'RRULE:FREQ=DAILY;COUNT=1',
            gracePeriod: 0,
            rRuleDescription:
                'Repeats every 1 days, ends after 1 occurrence(s)',
        },
        showOverdue: true,
        futureDatesOnly: false,
        emailNotification: false,
    }
    return alert(JSON.stringify(data))
    // return mockReasignChecklist()
}

export async function saveSchedule(schedule: IScheduleRequest): Promise<any> {
    const url =
        `checklist-templates/${schedule.tempid}/schedules` +
        (schedule.id ? `/${schedule.id}` : '')
    const params = {
        method: schedule.id ? 'PUT' : 'POST',
        body: JSON.stringify(schedule),
    }
    console.log('url', url)
    console.log('params', params)
    return
}

export async function createSurvey(): Promise<any> {
    const baseUrl = '/checklist-templates/12633756/schedules/'
    const body = {
        name: '1 Copy',
        path: '2f6EbamLMmHLIjSKVnTWjX',
        welcomeMessage: 'Welcome, Please select an option',
        noOfTextFields: 1,
        checklistType: 'site',
        sites: [
            {
                id: 12525635,
                name: 'a1',
            },
            {
                id: 12584498,
                name: 'test site',
            },
            {
                id: 12589506,
                name: 'email test',
            },
        ],
        toRecipients: [
            'darrell@1placeonline.com',
            'new@1place.co.nz',
            'darrell_wu@yahoo.co.nz',
        ],
    }
    return mockReasignChecklist()
}
