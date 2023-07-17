import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { IApi } from '../../data_sources/api'
import { FormControl, Grid, InputLabel } from '@material-ui/core'
import { GridProps } from '@material-ui/core/Grid'
import { UserFacingError } from '../../errors/UserFacingError'
import { IEmailFields } from '../../models/EmailTypes'
import { IChecklistRespondent } from '../../models/ChecklistRespondent'
import { IChecklistResponse } from '../../components/checklists/utils/submitChecklist'
import { IChecklistInfoResponse } from './Checklist'

import {
    IOneplaceLibraryContextProp,
    PageLoader,
    IChecklistEmailResponse,
    withOneplaceLibraryContext
} from 'oneplace-components'
import TextChipListControl from '../form_controls/TextChipListControl'

export interface IChecklistEmailDialogProps
    extends IOneplaceLibraryContextProp {
    isOpen: boolean
    encodedChecklistInfo: string
    api: IApi
    respondent?: IChecklistRespondent
    franchiseeId: number
    onClose: () => void
    onSubmitDialogsCompleted: () => void
    checklistResponse: IChecklistResponse | undefined
    checklistInfoResponse: IChecklistInfoResponse | null
}

export interface IChecklistEmailDialogState {
    stage:
        | 'loading'
        | 'edit_email'
        | 'sending'
        | 'sent'
        | 'error'
        | 'submit_error'
    initialValues: IEmailFields
    score: number
    unansweredQuestions: number
    sendEnabled: boolean
    submitError: string
}

export const ChecklistEmailDialog = withOneplaceLibraryContext(
    class extends React.Component<
        IChecklistEmailDialogProps,
        IChecklistEmailDialogState
    > {
        messageContent: IEmailFields = null as any

        constructor(props: any) {
            super(props)
            this.onValidate = this.onValidate.bind(this)
            this.onSendClicked = this.onSendClicked.bind(this)
            this.onClose = this.onClose.bind(this)
            this.onSubmitErrorClose = this.onSubmitErrorClose.bind(this)

            this.state = {
                stage: 'loading',
                score: 0,
                unansweredQuestions: 0,
                initialValues: null as any,
                sendEnabled: true,
                submitError: ''
            }
        }

        componentDidMount() {
            this.loadTemplate()
        }

        async loadTemplate() {
            const surveyName = this.props.checklistInfoResponse!.survey.name
            try {
                const template = {} as IChecklistEmailResponse
                const emailFields = {} as IEmailFields
                emailFields.subject = `Here is a copy of your ${surveyName}`
                emailFields.message = `Hi, please find a copy of your ${surveyName} attached.`
                template.unansweredQuestions =
                    this.props.checklistResponse!.unansweredQuestions
                template.message = emailFields
                this.messageContent = template.message

                this.setState({
                    stage: 'edit_email',
                    score: template.score,
                    unansweredQuestions: template.unansweredQuestions,
                    initialValues: template.message
                })
                this.onValidate(template.message)
            } catch (e) {
                this.setState({
                    stage: 'error'
                })
            }
        }

        onValidate(fields: IEmailFields) {
            this.messageContent = fields
            const valid = Boolean(
                fields.toEmail &&
                    fields.toEmail.trim() &&
                    fields.subject.trim() &&
                    fields.message.trim()
            )
            if (valid !== this.state.sendEnabled) {
                this.setState({ sendEnabled: valid })
            }
        }

        onClose() {
            this.props.onClose()
            this.props.onSubmitDialogsCompleted()
        }

        onSubmitErrorClose() {
            this.setState({ stage: 'edit_email' })
        }

        async onSendClicked() {
            this.setState({
                stage: 'sending'
            })
            try {
                await this.props.api.sendChecklistEmail(
                    this.props.checklistResponse!.checklistId,
                    this.messageContent
                )
                this.setState({
                    stage: 'sent'
                })
            } catch (e) {
                if (e instanceof UserFacingError) {
                    this.setState({
                        stage: 'submit_error',
                        submitError: e.message,
                        initialValues: this.messageContent
                    })
                } else {
                    this.setState({
                        stage: 'error'
                    })
                }
            }
        }

        render() {
            const t = (key: string) => {
                return this.props.ctx.i18next.t(key)
            }
            const gridProps: GridProps = { xs: 12 }

            return (
                <Dialog
                    open={this.props.isOpen}
                    PaperProps={{ style: { width: '95%', maxWidth: 700 } }}
                    onClose={(_event, reason) => {
                        if (
                            ['backdropClick', 'escapeKeyDown'].includes(reason)
                        ) {
                            return false
                        }
                        return true
                    }}
                >
                    <DialogTitle>{t('email_checklist')}</DialogTitle>
                    <DialogContent>
                        {(this.state.stage === 'loading' ||
                            this.state.stage === 'sending') && (
                            <PageLoader loading={true} paddingTop={0} />
                        )}
                        {this.state.stage === 'edit_email' && (
                            <Formik
                                initialValues={this.state.initialValues}
                                onSubmit={() => {}}
                                validate={this.onValidate}
                                render={() => (
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item {...gridProps}>
                                                <FormControl fullWidth>
                                                    <InputLabel
                                                        htmlFor='toEmail'
                                                        shrink={true}
                                                    >
                                                        {t('email_to')}
                                                    </InputLabel>
                                                    <Field
                                                        id='toEmail'
                                                        name='toEmail'
                                                        component={
                                                            TextChipListControl
                                                        }
                                                        label='Add Email'
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            />
                        )}
                        {this.state.stage === 'error' && (
                            <PageLoader
                                loading={false}
                                paddingTop={0}
                                status={t('email_process_error')}
                            />
                        )}
                        {this.state.stage === 'sent' && (
                            <PageLoader
                                loading={false}
                                paddingTop={0}
                                status={t('email_sent_successfully')}
                            />
                        )}
                        {this.state.stage === 'submit_error' && (
                            <PageLoader
                                loading={false}
                                paddingTop={0}
                                status={this.state.submitError}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        {this.state.stage === 'edit_email' && (
                            <>
                                <Button onClick={this.onClose} color='primary'>
                                    {t('cancel')}
                                </Button>
                                <Button
                                    disabled={!this.state.sendEnabled}
                                    onClick={this.onSendClicked}
                                    color='primary'
                                >
                                    {t('send_email')}
                                </Button>
                            </>
                        )}
                        {this.state.stage === 'error' && (
                            <>
                                <Button onClick={this.onClose} color='primary'>
                                    {t('close')}
                                </Button>
                            </>
                        )}
                        {this.state.stage === 'submit_error' && (
                            <>
                                <Button
                                    onClick={this.onSubmitErrorClose}
                                    color='primary'
                                >
                                    {t('close')}
                                </Button>
                            </>
                        )}
                        {this.state.stage === 'sent' && (
                            <>
                                <Button onClick={this.onClose} color='primary'>
                                    {t('ok')}
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>
            )
        }
    }
)
