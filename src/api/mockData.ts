import { ICheckListData } from '../pages/Checklists'

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
