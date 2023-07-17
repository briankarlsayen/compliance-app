import * as React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    FormControlLabel
} from '@material-ui/core'
import {
    Theme,
    createStyles,
    withStyles,
    WithStyles
} from '@material-ui/core/styles'
import {
    AssigneeType,
    IFranchisee,
    ISite,
    getSiteFranchiseeId,
    IImageStorage,
    CheckboxControl,
    IOneplaceLibraryContextProp,
    withOneplaceLibraryContext
} from 'oneplace-components'
import { submitChecklist, IChecklistResponse } from './utils/submitChecklist'
import CircularProgress from '@material-ui/core/CircularProgress'
import { IApi } from '../../data_sources/api'
import { UserFacingError } from '../../errors/UserFacingError'
import { NetworkError } from '../../errors/NetworkError'
import { IChecklistRespondent } from '../../models/ChecklistRespondent'
import { IChecklistInfoResponse } from './Checklist'

const styles = (theme: Theme) =>
    createStyles({
        checklistFields: {
            paddingTop: 8
        },
        readOnlyField: {
            marginTop: 10
        }
    })

export interface ISubmitChecklistDialogState {
    stage:
        | 'confirm'
        | 'submitting'
        | 'submit_success'
        | 'friendly_error'
        | 'unexpected_error'
    errorText?: string
    toEmail: boolean
    editEmail: boolean
    checklistId: number
    score?: number
    unansweredQuestions?: number
}

export interface ISubmitChecklistDialogProps
    extends WithStyles<typeof styles>,
        IOneplaceLibraryContextProp {
    encodedChecklistInfo: string
    isOpen: boolean
    api: IApi
    respondent: IChecklistRespondent
    checklistInfoResponse: IChecklistInfoResponse
    imageStorage: IImageStorage
    assigneeType: AssigneeType
    franchisee?: IFranchisee
    site?: ISite
    incompleteFields: boolean
    onClose: () => void
    onChecklistSubmitted: (checklistId: number) => Promise<void>
    onSubmitDialogsCompleted: () => void
    showEmailDialog: () => void
    onReceiveChecklistResponse: (checklistResponse: IChecklistResponse) => void
}

// Use an intermedite component to make sure dialog is unmounted when finished with
export const SubmitChecklistDialog = withOneplaceLibraryContext(
    withStyles(styles)((props: ISubmitChecklistDialogProps) => {
        if (props.isOpen) {
            return <SubmitChecklistDialogContent {...props} />
        } else {
            return null
        }
    })
)

class SubmitChecklistDialogContent extends React.Component<
    ISubmitChecklistDialogProps,
    ISubmitChecklistDialogState
> {
    constructor(props: any) {
        super(props)

        this.state = {
            stage: 'confirm',
            toEmail: false,
            editEmail: true,
            checklistId: 0
        }
    }

    onEmailOptionChanged = (field: 'toEmail' | 'editEmail', value: any) => {
        if (field === 'toEmail' && !value) {
            this.setState({
                toEmail: false,
                editEmail: false
            })
        } else {
            const update: any = { [field]: value }
            this.setState(update)
        }
    }

    navigateToEndPage = () => {
        this.props.onClose()
        this.props.onSubmitDialogsCompleted()
    }

    onSubmitClicked = async () => {
        const franchiseeId =
            this.props.assigneeType === 'franchisee'
                ? this.props.franchisee!.id
                : getSiteFranchiseeId(this.props.site!)
        this.setState({ stage: 'submitting' })
        this.props.checklistInfoResponse.checklist.toEmail = this.state.toEmail
        this.props.checklistInfoResponse.checklist.editEmail =
            this.state.editEmail
        try {
            const checklistResponse = await submitChecklist(
                this.props.api,
                franchiseeId,
                this.props.checklistInfoResponse.checklist,
                this.props.imageStorage
            )
            this.props.onReceiveChecklistResponse(checklistResponse)
            await this.props.onChecklistSubmitted(checklistResponse.checklistId)
            if (this.state.toEmail) {
                this.props.showEmailDialog()
                this.props.onClose()
            } else {
                this.setState({
                    stage: 'submit_success',
                    checklistId: checklistResponse.checklistId,
                    score: checklistResponse.score,
                    unansweredQuestions: checklistResponse.unansweredQuestions
                })
            }
        } catch (e) {
            if (e instanceof UserFacingError) {
                this.setState({ stage: 'friendly_error', errorText: e.message })
            } else if (e instanceof NetworkError) {
                this.setState({
                    stage: 'unexpected_error',
                    errorText: this.props.ctx.i18next.t('network_error')
                })
            } else {
                this.setState({
                    stage: 'unexpected_error',
                    errorText: e.message
                })
            }
        }
    }

    onClose = () => {
        if (this.state.stage === 'submit_success') {
            this.props.onClose()
            this.props.onSubmitDialogsCompleted()
        } else {
            this.props.onClose()
        }
    }

    render() {
        const t = (key: string) => {
            return this.props.ctx.i18next.t(key)
        }

        const assigneeTypeLabel =
            this.props.assigneeType === 'franchisee'
                ? t('customLabel_franchisee')
                : t('customLabel_site')
        const assigneeName =
            this.props.assigneeType === 'franchisee'
                ? this.props.franchisee!.name
                : this.props.site!.name

        const dismissDisabled = this.state.stage === 'submitting'

        return (
            <Dialog
                open={this.props.isOpen}
                onClose={(_event, reason) => {
                    if (
                        dismissDisabled &&
                        ['backdropClick', 'escapeKeyDown'].includes(reason)
                    ) {
                        return
                    }
                    this.onClose()
                }}
            >
                <DialogTitle>Submit</DialogTitle>
                <DialogContent>
                    {this.state.stage === 'confirm' && (
                        <div>
                            {this.props.incompleteFields && (
                                <DialogContentText>
                                    You have unanswered questions
                                </DialogContentText>
                            )}
                            <DialogContentText>
                                Submit{' '}
                                {this.props.checklistInfoResponse.survey.name}?
                            </DialogContentText>
                            <div className={this.props.classes.checklistFields}>
                                <div
                                    className={this.props.classes.readOnlyField}
                                >
                                    <Typography variant='caption'>
                                        {assigneeTypeLabel}
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        {assigneeName}
                                    </Typography>
                                </div>
                                <div
                                    className={this.props.classes.readOnlyField}
                                >
                                    <Typography variant='caption'>
                                        {t('checklist_name')}
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        {
                                            this.props.checklistInfoResponse
                                                .survey.name
                                        }
                                    </Typography>
                                </div>
                                <br />
                                <div>
                                    <FormControlLabel
                                        control={
                                            <CheckboxControl
                                                id='toEmailField'
                                                field={
                                                    {
                                                        name: 'toEmail',
                                                        value: this.state
                                                            .toEmail
                                                    } as any
                                                }
                                                form={
                                                    {
                                                        setFieldValue:
                                                            this
                                                                .onEmailOptionChanged
                                                    } as any
                                                }
                                                meta={{
                                                    value: null,
                                                    touched: false,
                                                    initialTouched: false
                                                }}
                                            />
                                        }
                                        label={t('checklist_toemail')}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {this.state.stage === 'submitting' && (
                        <div style={{ display: 'flex', marginTop: 10 }}>
                            <CircularProgress size={32} />
                            <Typography
                                style={{
                                    fontSize: 16,
                                    marginTop: 6,
                                    marginLeft: 16
                                }}
                            >
                                {t('submitting')}
                            </Typography>
                        </div>
                    )}
                    {this.state.stage === 'submit_success' && (
                        <div>
                            <DialogContentText>
                                {t('submit_success')}
                            </DialogContentText>
                        </div>
                    )}
                    {this.state.stage === 'friendly_error' && (
                        <div>
                            <DialogContentText>
                                {t('submit_failed')}
                            </DialogContentText>
                            <Typography style={{ marginTop: 16 }}>
                                {this.state.errorText}
                            </Typography>
                        </div>
                    )}
                    {this.state.stage === 'unexpected_error' && (
                        <div>
                            <DialogContentText>
                                {t('submit_error')}
                            </DialogContentText>
                            <Typography style={{ marginTop: 16 }}>
                                {this.state.errorText}
                            </Typography>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {this.state.stage === 'confirm' && (
                        <>
                            <Button onClick={this.onClose} color='primary'>
                                {t('cancel')}
                            </Button>
                            <Button
                                onClick={this.onSubmitClicked}
                                color='primary'
                            >
                                {t('submit')}
                            </Button>
                        </>
                    )}
                    {['friendly_error', 'unexpected_error'].indexOf(
                        this.state.stage
                    ) > -1 && (
                        <>
                            <Button
                                onClick={this.onSubmitClicked}
                                color='primary'
                            >
                                {t('retry_submission')}
                            </Button>
                            <Button onClick={this.onClose} color='primary'>
                                {t('continue_editing')}
                            </Button>
                        </>
                    )}
                    {this.state.stage === 'submit_success' && (
                        <Button
                            onClick={this.navigateToEndPage}
                            color='primary'
                        >
                            {t('ok')}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        )
    }
}
