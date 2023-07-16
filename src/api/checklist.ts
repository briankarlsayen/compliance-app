import { fetchWithErrorHandling } from '../common'
import { ICheckListData } from '../pages/Checklists'
import { IScheduleData } from '../pages/Schedules'
import { ISurvey } from '../pages/Survey'
import franchisees from './franchisees'
import alias from './alias'
import dayjs from 'dayjs'
import { IScheduleRequest } from '../pages/ScheduleFormContainer'
import { IScheduleEventReq } from '../pages/ScheduleFrequencyForm'
import { ISurveyRequest } from '../pages/SurveyForm'

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
            adhoc: true
        },
        {
            id: 2,
            name: '1Place Standard Centre Closing Procedure // v1.2',
            schedules: 4,
            template: 'form',
            recStatus: 'active',
            adhoc: false
        },
        {
            id: 3,
            name: '1Place Standard Centre Closing Procedure // v1.3',
            schedules: 5,
            template: 'partner',
            recStatus: 'active',
            adhoc: false
        },
        {
            id: 4,
            name: '1Place Standard Centre Closing Procedure // v1.4',
            schedules: 1,
            template: 'form',
            recStatus: 'inactive',
            adhoc: true
        },
        {
            id: 5,
            name: '1Place Standard Centre Closing Procedure // v1.5',
            schedules: 8,
            template: 'form',
            recStatus: 'inactive',

            adhoc: true
        },
        {
            id: 6,
            name: '1Place Standard Centre Closing Procedure // v1.6',
            schedules: 9,
            template: 'partner',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 7,
            name: '1Place Standard Centre Closing Procedure // v1.7',
            schedules: 11,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 8,
            name: '1Place Standard Centre Closing Procedure // v1.8',
            schedules: 2,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 9,
            name: '1Place Standard Centre Closing Procedure // v1.9',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 10,
            name: '1Place Standard Centre Closing Procedure // v1.10',
            schedules: 8,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 11,
            name: '1Place Standard Centre Closing Procedure // v1.11',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 12,
            name: '1Place Standard Centre Closing Procedure // v1.12',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 13,
            name: '1Place Standard Centre Closing Procedure // v1.13',
            schedules: 6,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 14,
            name: '1Place Standard Centre Closing Procedure // v1.14',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 15,
            name: '1Place Standard Centre Closing Procedure // v1.15',
            schedules: 1,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        },
        {
            id: 16,
            name: '1Place Standard Centre Closing Procedure // v1.16',
            schedules: 4,
            template: 'form',
            recStatus: 'active',
            adhoc: true
        }
    ]
    const newMock = [
        {
            id: 1,
            name: 'Mock',
            recrecStatus: 'active',
            schedules: 3,
            template: 'form',
            adhoc: true
        },
        {
            id: 2,
            name: 'Mock1',
            recrecStatus: 'active',
            schedules: 3,
            template: 'form',
            adhoc: true
        }
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
                'User 12'
            ],
            event: {
                startDate: '04-24-2023',
                rRule: 'FREQ=DAILY;UNTIL=20200524T000000Z',
                rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020'
            }
        }
    ]

    const realData = [
        {
            entities: ['darrell'],
            event: {
                gracePeriod: 0,
                id: 4602,
                rRule: 'FREQ=DAILY;UNTIL=20200524T000000Z',
                rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020',
                startDate: '2020-05-24'
            },
            id: 4167,
            name: 'until / test',
            showOverdue: true
        }
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 8'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
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
                'User 12'
            ]
        },
        {
            id: 14,
            name: 'Survey 14',
            expiry_date: '04-24-2023',
            qrCodeLink: 'https://picsum.photos/200',
            surveyUrl: '3KFNLztllSbTlXckrVE9Kx',
            entities: ['User 1']
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
                'User 12'
            ]
        }
    ]

    const data = {
        entities: [
            'Henderson Rd',
            'Andrew Simms Newmarket',
            'Andrew Simms Botany',
            'external id 2',
            'good site'
        ],
        id: 57,
        name: '1',
        qrCodeLink:
            'http://localhost:8280/api/checklist-templates/12634620/surveys/57/qrcode.png',
        surveyUrl: 'http://localhost:3000/pa/D1UodAaOfH8M0Rb7Ovk4I'
    }

    return await wait(1000, mockSchedules)
}

export const mockFranchisee = async () => {
    const franchiseeList = [
        {
            id: 151,
            name: 'Franchisee1',
            recStatus: 'active'
        },
        {
            id: 152,
            name: 'Franchisee2',
            recStatus: 'active'
        },
        {
            id: 153,
            name: 'Franchisee3',
            recStatus: 'archived'
        }
    ]
    return await wait(0, franchiseeList)
}

export const mockSites = async () => {
    const sites = [
        {
            id: 1,
            name: 'Uno',
            recStatus: 'active'
        },
        {
            id: 161,
            name: 'Site 1',
            recStatus: 'active'
        },
        {
            id: 162,
            name: 'Site 2',
            recStatus: 'active'
        },
        {
            id: 163,
            name: 'Site 3',
            recStatus: 'archived'
        }
    ]
    return await wait(0, sites)
}

export const mockAlias = async () => {
    return await wait(0, [])
}

export const mockFranchiseeAlias = () => {
    return {
        franchiseeAliases: [
            {
                id: 122,
                name: 'Franchisee alias Test1',
                recStatus: 'active'
            },
            {
                id: 681,
                name: 'reporting',
                recStatus: 'active'
            },
            {
                id: 59,
                name: 'test',
                recStatus: 'active'
            }
        ]
    }
}

export const mockSiteAlias = () => {
    return {
        pagination: {
            totalItems: 7,
            totalPages: 1,
            itemsPerPage: 100
        },
        siteAliases: [
            {
                id: 272,
                name: "<script>alert('alias')</script>",
                recStatus: 'active'
            },
            {
                id: 273,
                name: 'aaa',
                recStatus: 'active'
            },
            {
                id: 1120,
                name: 'alias user',
                recStatus: 'active'
            },
            {
                id: 3,
                name: 'aNDREW sIMMS',
                recStatus: 'active'
            },
            {
                id: 72,
                name: 'FC - 1',
                recStatus: 'active'
            },
            {
                id: 565,
                name: 'head office',
                recStatus: 'active'
            },
            {
                id: 1225,
                name: 'reporting',
                recStatus: 'active'
            }
        ]
    }
}

export const mockSurveyDetails = async () => {
    const franchiseeSurvey = {
        id: 57,
        name: '1',
        noOfTextFields: 1,
        surveyUrl: 'http://localhost:3000/pa/D1UodAaOfH8M0Rb7Ovk4I',
        qrCode: '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',
        welcomeMessage: 'Welcome, Please select an option',
        checklistType: 'franchisee',
        franchisees: [
            {
                id: 11,
                name: 'Henderson Rd'
            },
            {
                id: 12,
                name: 'Andrew Simms Newmarket'
            },
            {
                id: 13,
                name: 'Andrew Simms Botany'
            },
            {
                id: 14,
                name: 'external id 2'
            },
            {
                id: 15,
                name: 'good site'
            },
            {
                id: 16,
                name: 'new site alias test'
            },
            {
                id: 151,
                name: 'Franchisee1'
            }
        ],
        toRecipients: ['darrell@1placeonline.com', 'darrell_wu@yahoo.co.nz']
    }

    const siteSurvey = {
        checklistType: 'site',
        id: 66,
        name: 'survey 3',
        noOfTextFields: 0,
        qrCode: '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',
        sites: [
            { id: 1, name: 'Uno' },
            { id: 12525635, name: 'a1' }
        ],
        surveyUrl: 'http://localhost:3000/pa/2kpbSZ7SMWUjkZr7wrrsvR',
        toRecipients: [],
        welcomeMessage: 'welcome here'
    }
    return siteSurvey
}

export const mockNewSurvey = async () => {
    const realResponse = {
        name: '1',
        surveyUrl: 'http://localhost:3000/pa/7LWnv65PaHzRCzVni3FNFU',
        path: '7LWnv65PaHzRCzVni3FNFU',
        welcomeMessage: 'Welcome, Please select an option',
        noOfTextFields: 1,
        qrCode: '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',
        checklistType: 'site',
        toRecipients: []
    }

    return realResponse
}

export const mockVersion = async () => {
    const realVersion = [
        {
            id: 12917828,
            createdDateTime: '2018-07-09T04:54:13Z',
            version: '1-draft',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12971588,
            createdDateTime: '2019-03-28T20:09:42Z',
            version: '2',
            status: 'archived',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12971589,
            createdDateTime: '2019-03-28T20:25:05Z',
            version: '2',
            status: 'current',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12971590,
            createdDateTime: '2019-03-28T20:26:02Z',
            version: '2-draft',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12973415,
            createdDateTime: '2021-05-17T21:16:47Z',
            version: '2-draft',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12973712,
            createdDateTime: '2022-04-09T23:38:06Z',
            version: '2-draft',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12973818,
            createdDateTime: '2022-08-18T04:24:19Z',
            version: '2-draft',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12974124,
            createdDateTime: '2023-07-12T23:07:43Z',
            version: '2-draft copy',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12974126,
            createdDateTime: '2023-07-12T23:09:26Z',
            version: '2-draft copy copy',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        },
        {
            id: 12974130,
            createdDateTime: '2023-07-12T23:15:08Z',
            version: '2-draft copy copy copy',
            status: 'draft',
            creator: {
                id: 12434657,
                name: 'Dennis Branding'
            }
        }
    ]

    return await wait(1000, realVersion)
}

export const mockVersionHistory = async () => {
    return {
        history: [
            {
                id: 18518,
                createdDate: '2021-05-21T05:00:58Z',
                oldStatus: 'draft',
                newStatus: 'current',
                comment: 'Created from template checklist 1 version 2',
                actionedBy: 'Dennis  Branding'
            }
        ]
    }
}

export const mockPromotionDetails = async () => {
    const promotionDetails = {
        name: 'Final Draft',
        commission: ''
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
            isLocked: true
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
            isLocked: false
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
            isLocked: true
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
            isLocked: false
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
            isLocked: false
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
            isLocked: true
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
            isLocked: false
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
            isLocked: false
        }
    ]
    return await wait(1000, registerDetails)
}

export const mockReasignChecklist = async () => {
    const reassignChecklist = [
        {
            centre: '1Place User',
            room: 'Room1',
            label: 'User 1',
            complete: false
        },
        {
            centre: 'Head Office',
            room: 'Room2',
            label: 'User 2',
            complete: false
        },
        {
            centre: '1Place User',
            room: 'Room3',
            label: 'User 3',
            complete: true
        },
        {
            centre: '1Place User',
            room: 'Room4',
            label: 'User 4',
            complete: false
        },
        {
            centre: '1Place User',
            room: 'Room5',
            label: 'User 5',
            complete: false
        },
        {
            centre: 'Head Office',
            room: 'Room6',
            label: 'User 6',
            complete: false
        },
        {
            centre: '1Place User',
            room: 'Room7',
            label: 'User 7',
            complete: true
        },
        {
            centre: '1Place User',
            room: 'Room8',
            label: 'User 8',
            complete: false
        }
    ]
    return await wait(1000, reassignChecklist)
}

export const mockScheduleDetails = async () => {
    const siteSchedule = {
        checklistType: 'site',
        emailNotification: false,
        event: {
            gracePeriod: 0,
            id: 4602,
            rRule: 'RRULE:FREQ=DAILY;UNTIL=20200524T000000Z;INTERVAL=2',
            rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020',
            startDate: '2020-05-24'
        },
        id: 4167,
        name: 'until / test',
        showOverdue: true,
        futureDatesOnly: false,
        historicEvents: [],
        sites: [
            {
                id: 1,
                name: 'Uno',
                recStatus: 'active'
            },
            {
                id: 12587549,
                name: 'darrell wu'
            },
            {
                id: 12587550,
                name: 'kobe'
            }
        ]
    }

    const franchiseeSchedule = {
        checklistType: 'franchisee',
        emailNotification: false,
        event: {
            gracePeriod: 0,
            id: 4602,
            rRule: 'RRULE:FREQ=DAILY;UNTIL=20200524T000000Z;INTERVAL=2',
            rRuleDescription: 'Repeats every 1 days, ends on 24 May, 2020',
            startDate: '2020-05-24'
        },
        id: 4167,
        name: 'until / test',
        showOverdue: true,
        futureDatesOnly: false,
        historicEvents: [],
        franchisees: [
            {
                id: 12587549,
                name: 'darrell wu'
            }
        ]
    }

    return siteSchedule
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

export async function fetchSurvey(tempid: number): Promise<any> {
    return mockSurvey()
}

export async function fetchFranchisees(): Promise<any> {
    return mockFranchisee()
}

export async function fetchSites(): Promise<any> {
    return mockSites()
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

export async function fetchNewSurvey(id: number): Promise<any> {
    return mockNewSurvey()
}

export async function fetchVersions(id: number): Promise<any> {
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
                name: 'Queensgate'
            },
            {
                id: 12435185,
                name: 'Henderson Rd'
            },
            {
                id: 12547893,
                name: 'Four Square - Thames'
            },
            {
                id: 12435195,
                name: 'Botany site'
            },
            {
                id: 12435199,
                name: 'Riccarton (Chch)'
            },
            {
                id: 12547667,
                name: '11111111'
            },
            {
                id: 12448162,
                name: 'Christchurch '
            },
            {
                id: 12499656,
                name: 'test'
            },
            {
                id: 12525635,
                name: 'a1'
            },
            {
                id: 12533314,
                name: 'Dryer (Gas) - Electrolux Wascator T3530'
            },
            {
                id: 12540726,
                name: 'Gazley Motors'
            },
            {
                id: 12540725,
                name: 'Andrew Simms Botany'
            },
            {
                id: 12533316,
                name: 'Washer Fisher & Paykel Quicksmart'
            },
            {
                id: 12540727,
                name: 'Euromarque'
            },
            {
                id: 12540724,
                name: 'Andrew Simms Newmarket'
            },
            {
                id: 12533318,
                name: '(Eq) Washer Paul Newcombe Electrolux FLE 22'
            },
            {
                id: 12533319,
                name: '(Eq) Dryer Paul Newcombe ADC ADE 75'
            }
        ],
        event: {
            id: 3257,
            startDate: '2017-08-23',
            rRule: 'RRULE:FREQ=DAILY;COUNT=1',
            gracePeriod: 0,
            rRuleDescription: 'Repeats every 1 days, ends after 1 occurrence(s)'
        },
        showOverdue: true,
        futureDatesOnly: false,
        emailNotification: false
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
        body: JSON.stringify(schedule)
    }
    return alert(JSON.stringify(schedule, null, '\t'))
}

export async function saveSurvey(survey: ISurveyRequest): Promise<any> {
    const url =
        `checklist-templates/${survey.tempid}/surveys` +
        (survey.id ? `/${survey.id}` : '')
    const params = {
        method: survey.id ? 'PUT' : 'POST',
        body: JSON.stringify(survey)
    }
    return alert(JSON.stringify(survey, null, '\t'))
}

export async function updateScheduleEvent(
    event: IScheduleEventReq
): Promise<any> {
    const url =
        `checklist-templates/${event.tempid}/schedules` +
        (event.id ? `/${event.id}` : '')
    const params = {
        method: 'PATCH',
        body: JSON.stringify(event)
    }

    return alert(JSON.stringify(event, null, '\t'))
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
                name: 'a1'
            },
            {
                id: 12584498,
                name: 'test site'
            },
            {
                id: 12589506,
                name: 'email test'
            }
        ],
        toRecipients: [
            'darrell@1placeonline.com',
            'new@1place.co.nz',
            'darrell_wu@yahoo.co.nz'
        ]
    }
    return mockReasignChecklist()
}

export async function deleteVersion(tempid: number, id: number): Promise<any> {
    const baseUrl = `/checklist-templates/${tempid}/versions/${id}`
    const params = {
        method: 'DELETE'
    }
    return alert('Version deleted')
}

export async function copyVersion(tempid: number, id: number): Promise<any> {
    const baseUrl = `/checklist-templates/${tempid}/versions/${id}/copy`
    const params = {
        method: 'POST'
    }
    return alert('Version copied')
}

export async function changeStatusVersion(version: any): Promise<any> {
    const baseUrl = `/checklist-templates/${version.tempid}/versions/${version.id}/status`
    const params = {
        method: 'POST'
    }
    return alert(JSON.stringify(version, null, '\t'))
    // return alert('Status updated')
}
