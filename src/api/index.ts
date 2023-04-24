import { fetchWithErrorHandling } from '../common'

export async function updateChecklist(checklist: any): Promise<any> {
    return fetchWithErrorHandling<any>(
        'PUT',
        'checklist/' + checklist.id,
        JSON.stringify(checklist)
    )
}

export async function fetchChecklist(): Promise<any> {
    return fetchWithErrorHandling<any>('GET', 'checklists')
}
