import React from 'react'
import { ChecklistHeader } from '../ChecklistComplete/ChecklistHeader'
import { ChecklistInfo } from '../ChecklistComplete/ChecklistInfo'

interface IFranchisee {
    id: number
    name: string
    email: string
    attributes: any[]
    primaryContact?: any
    primaryAddress?: any
    customFields?: any[]
    external?: boolean
    disabledFields?: any
}

interface ISite {
    id: number
    name: string
    address?: any
    email: string
    contact?: any
    attributes: any[]
    customFields?: any[]
    external?: boolean
    disabledFields?: any
    franchisee?: {
        id?: number
        name?: string
        email?: string
        attributes?: any[] | null
    }
    franchiseeId?: number
    franchiseeEmail?: string
    franchiseeName?: string
    franchiseeAttributes?: any[] | null
}

interface IChecklistInfo {
    surveyName: string
    assignee: string // * franchisee | site
    franchisee: IFranchisee
    site: ISite
}

export default function NewComplete() {
    const handleSubmit = () => {
        console.log('submit')
    }

    const info = {
        name: 'checklist',
        assigneeType: 'site',
        franchisee: {},
        site: {
            name: 'Site1'
        }
    }

    return (
        <>
            <ChecklistHeader onSubmitChecklist={() => handleSubmit()} />
            <ChecklistInfo
                surveyName={info.name}
                assignee={info.assigneeType}
                franchisee={info.franchisee}
                site={info.site}
            />
        </>
    )
}
