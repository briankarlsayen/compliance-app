import { fetchWithErrorHandling } from '../common'
import { ICheckListData } from '../pages/Checklists'
import { IScheduleData } from '../pages/Schedules'
import { ISurvey } from '../pages/Survey'
import franchisees from './franchisees'
import alias from './alias'
import dayjs from 'dayjs'

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
        id: 17,
        alias: ['Alias4'],
        expiry_date: dayjs('2000-12-12'),
        link: 'http://localhost:3000/pa/2Kl40jChHRGyp0mtgg9tal',
        name: 'survery 1',
        selected_sites: [],
        survey_for: ['User3'],
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
            rRule: 'FREQ=DAILY;UNTIL=20200524T000000Z',
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

interface PUpdate {
    tempid: number
    id: number
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

export async function fetchSurveyDetails(): Promise<any> {
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
