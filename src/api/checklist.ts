import { fetchWithErrorHandling } from '../common'
import { ICheckListData } from '../pages/Checklists'
import { IScheduleData } from '../pages/Schedules'

function wait<T>(ms: number, value: T) {
    return new Promise<T>((resolve) => setTimeout(resolve, ms, value))
}

export const mockChecklist = async () => {
    const mockData: ICheckListData[] = [
        {
            title: '1Place Standard Centre Closing Procedure // v1.1',
            schedules: 3,
            template: 'form',
            status: 'inactive',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.2',
            schedules: 4,
            template: 'form',
            status: 'active',
            adhoc: false,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.3',
            schedules: 5,
            template: 'partner',
            status: 'active',
            adhoc: false,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.4',
            schedules: 1,
            template: 'form',
            status: 'inactive',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.5',
            schedules: 8,
            template: 'form',
            status: 'inactive',

            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.6',
            schedules: 9,
            template: 'partner',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.7',
            schedules: 11,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.8',
            schedules: 2,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.9',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.10',
            schedules: 8,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.11',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.12',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.13',
            schedules: 6,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.14',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.15',
            schedules: 1,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
        {
            title: '1Place Standard Centre Closing Procedure // v1.16',
            schedules: 4,
            template: 'form',
            status: 'active',
            adhoc: true,
        },
    ]
    return await wait(3000, mockData)
}

export const mockSchedule = async () => {
    const mockSchedules: IScheduleData[] = [
        {
            name: 'Documentation 1',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: [
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
            name: 'Documentation 2',
            start_date: '01-04-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
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
            name: 'Documentation 3',
            start_date: '05-11-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
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
            name: 'Documentation 4',
            start_date: '04-24-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: [
                'User 1',
                'User 2',
                'User 3',
                'User 4',
                'User 5',
                'User 12',
            ],
        },
        {
            name: 'Documentation 5',
            start_date: '05-14-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
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
            name: 'Documentation 6',
            start_date: '01-21-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: [
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
            name: 'Documentation 7',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
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
            name: 'Documentation 8',
            start_date: '01-24-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
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
            name: 'Documentation 9',
            start_date: '03-24-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
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
            name: 'Documentation 10',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
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
            name: 'Documentation 11',
            start_date: '01-24-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
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
            name: 'Documentation 12',
            start_date: '01-14-2023',
            show_over_due: false,
            sched_freq: 'Repeats every 1 week(s) on: Monday, Wednesday',
            for_user: [
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
            name: 'Documentation 13',
            start_date: '04-04-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
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
            name: 'Documentation 14',
            start_date: '04-24-2023',
            show_over_due: true,
            sched_freq: 'Repeats every 1 days, ends on 29 May, 2023',
            for_user: ['User 1'],
        },
        {
            name: 'Documentation 15',
            start_date: '04-21-2023',
            show_over_due: true,
            sched_freq:
                'Repeats every 1 months(s), on day 1 of the month, end on 31 June, 2023',
            for_user: [
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

    return await wait(3000, mockSchedules)
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
    return fetchWithErrorHandling<any>('GET', 'checklists')
}

export async function fetchSchedule(): Promise<any> {
    return mockSchedule()
    return fetchWithErrorHandling<any>('GET', 'schedules')
}
