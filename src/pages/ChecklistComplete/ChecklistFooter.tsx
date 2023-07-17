import React, { useState } from 'react'
import { SubmitChecklistDialog } from './SubmitChecklistDialog'
import { ChecklistEmailDialog } from './ChecklistEmailDialog'
import {
    IOneplaceLibraryContextProp,
    withOneplaceLibraryContext,
    IFranchisee,
    ISite,
    AssigneeType,
    ValidationErrors
} from 'oneplace-components'
import { IChecklistRespondent } from '../../models/ChecklistRespondent'
import { IChecklistResponse } from '../../components/checklists/utils/submitChecklist'
import { IChecklistInfoResponse } from './Checklist'

export interface IChecklistFooterProps extends IOneplaceLibraryContextProp {
    encodedChecklistInfo: string
    api: any
    checklistInfoResponse: IChecklistInfoResponse
    isSubmitDialogOpen: boolean
    respondent: IChecklistRespondent
    assigneeType: AssigneeType
    franchisee: IFranchisee | undefined
    site: ISite | undefined
    onCloseSubmitDialog: () => void
    onChecklistSubmitted: (checklistId: number) => Promise<void>
    onSubmitDialogsCompleted: () => void
    showEmailDialog: () => void
    errorsShown: boolean
    errors: string[]
    onErrorsDismissed: () => void
    isShowEmailDialog: boolean
    incompleteFields: boolean
    franchiseeId: number
    onCloseEmailDialog: () => void
}

const ChecklistFooterFn: React.FC<IChecklistFooterProps> = (props) => {
    const [checklistResponse, setChecklistResponse] = useState<
        IChecklistResponse | undefined
    >(undefined)

    return (
        <>
            <ValidationErrors
                errorsShown={props.errorsShown}
                errors={props.errors}
                onErrorsDismissed={props.onErrorsDismissed}
            />
            <SubmitChecklistDialog
                encodedChecklistInfo={props.encodedChecklistInfo}
                isOpen={props.isSubmitDialogOpen}
                incompleteFields={props.incompleteFields}
                imageStorage={props.ctx.imageStorage}
                api={props.api}
                checklistInfoResponse={props.checklistInfoResponse}
                respondent={props.respondent}
                assigneeType={props.assigneeType}
                franchisee={props.franchisee}
                site={props.site}
                onClose={props.onCloseSubmitDialog}
                onChecklistSubmitted={props.onChecklistSubmitted}
                onSubmitDialogsCompleted={props.onSubmitDialogsCompleted}
                showEmailDialog={props.showEmailDialog}
                onReceiveChecklistResponse={(response: IChecklistResponse) => {
                    setChecklistResponse(response)
                }}
            />
            {props.isShowEmailDialog && (
                <ChecklistEmailDialog
                    encodedChecklistInfo={props.encodedChecklistInfo}
                    isOpen={props.isShowEmailDialog}
                    api={props.api}
                    checklistInfoResponse={props.checklistInfoResponse}
                    franchiseeId={props.franchiseeId}
                    onClose={props.onCloseEmailDialog}
                    onSubmitDialogsCompleted={props.onSubmitDialogsCompleted}
                    checklistResponse={checklistResponse}
                />
            )}
        </>
    )
}

export const ChecklistFooter = withOneplaceLibraryContext(ChecklistFooterFn)
