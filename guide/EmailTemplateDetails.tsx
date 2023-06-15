import { useState, useContext, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    TextField,
} from '@material-ui/core'
import Select from '../common/Select'
import {
    IEmailTemplate,
    EmailTemplateType,
    OneplaceLibraryContext,
    IIDAndName,
} from 'oneplace-components'
import { isValidID } from '../../utils'
import Alert, { IAlertProps, useAlert } from '../common/Alert'
import PlaceHolders from './PlaceHolders'
import {
    getIncidentTypesWithNoEmailTemplate,
    getEmailTemplate,
    saveEmailTemplate,
    getIncidentDefaultEmailTemplate,
} from '../../data_sources/api'
import AutoComplete from '../common/AutoComplete'
import ActionButtons from '../common/ActionButtons'
import { queryActions } from '../../constants'
import Loading from '../common/Loading'

type TParams = { id: string }
interface IEmailTemplateDetailsProps extends RouteComponentProps<TParams> {}

function EmailTemplateDetails(props: IEmailTemplateDetailsProps) {
    const [emailTemplate, setEmailTemplate] = useState<IEmailTemplate | null>()
    const [incidentTypes, setIncidentTypes] = useState<IIDAndName[]>()

    //selection start, selection end, last field focused (body by default)
    const [selection, setSelection] = useState<any[]>([0, 0, 'body'])

    const [saveNow, setSaveNow] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [alert, alertFns] = useAlert({
        onClose: () => alertFns.clearAlert(),
    } as IAlertProps)
    const [loadDefaultTemplate, setLoadDefaultTemplate] =
        useState<boolean>(false)

    const ctx = useContext(OneplaceLibraryContext)
    const t = ctx.i18next.t

    const history = useHistory()

    function handleChange(event: any) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        setEmailTemplate({ ...emailTemplate!, [name]: value })
    }

    function handleBlur(event: any) {
        const start = event.target.selectionStart
        const end = event.target.selectionEnd
        setSelection([start, end, event.target.name])
    }

    function addPlaceHolder(placeholder: string) {
        if (!emailTemplate) return
        const fieldName: keyof IEmailTemplate = selection[2]
        const fieldValue = emailTemplate[fieldName] as string
        setEmailTemplate({
            ...emailTemplate,
            [fieldName]:
                fieldValue.substring(0, selection[0]) +
                placeholder +
                fieldValue.substring(selection[1]),
        })
    }

    function getTemplateTypes() {
        return Object.entries(EmailTemplateType).map(([key, value]) => {
            return {
                id: value,
                name: t('customLabel_incident'), //if we add more items, then we need to dinamicaly get the label
            }
        })
    }

    //fetch email template
    useEffect(() => {
        async function fetchEmailTemplate(id: number) {
            try {
                setLoading(true)
                const response = await getEmailTemplate(id)
                setEmailTemplate(response)
            } catch (e) {
                alertFns.setError(e)
            }
            setLoading(false)
        }
        const id = props.match.params.id
        if (isValidID(id)) {
            fetchEmailTemplate(Number(id))
        } else {
            setEmailTemplate({
                subject: '',
                body: '',
                type: EmailTemplateType.INCIDENT,
            } as IEmailTemplate)
            setLoadDefaultTemplate(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //load default template
    useEffect(() => {
        async function fetchAndLoadDefaultTemplate() {
            try {
                setLoading(true)
                const response = await getIncidentDefaultEmailTemplate()
                setEmailTemplate({
                    ...emailTemplate!,
                    subject: response.subject,
                    body: response.message,
                })
            } catch (e) {
                alertFns.setError(e)
            }
            setLoading(false)
        }
        if (loadDefaultTemplate) {
            setLoadDefaultTemplate(false)
            fetchAndLoadDefaultTemplate()
        }
    }, [alertFns, emailTemplate, loadDefaultTemplate])

    //fetch available entities (incident types for now)
    useEffect(() => {
        async function fetchAvailableEntities() {
            if (!emailTemplate) return
            try {
                setLoading(true)
                if (emailTemplate.type === EmailTemplateType.INCIDENT) {
                    const response = await getIncidentTypesWithNoEmailTemplate()
                    setIncidentTypes([
                        ...(emailTemplate.incidentTypes || []),
                        ...response,
                    ])
                }
            } catch (e) {
                alertFns.setError(e)
            }
            setLoading(false)
        }

        if (emailTemplate && !incidentTypes) {
            setIncidentTypes([])
            fetchAvailableEntities()
        }
    }, [alertFns, emailTemplate, incidentTypes])

    //save email template
    useEffect(() => {
        async function save() {
            setLoading(true)
            try {
                await saveEmailTemplate(emailTemplate!)
                history.push({
                    pathname: '/email-templates',
                    search: `?action=${queryActions.SAVED}`,
                })
            } catch (e) {
                alertFns.setError(e)
            }
            setLoading(false)
        }
        if (saveNow) {
            setSaveNow(false)
            save()
        }
    }, [saveNow, emailTemplate, alertFns, history])

    return (
        <>
            <Alert {...alert} />
            <Loading loading={loading} />
            {emailTemplate && (
                <Container maxWidth={false}>
                    <Card>
                        <CardHeader title="Email Template" />
                        <CardContent style={{ paddingTop: '20px' }}>
                            <Grid container>
                                <Grid
                                    container
                                    spacing={3}
                                    style={{ padding: '5px' }}
                                >
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            required={true}
                                            variant="outlined"
                                            name="name"
                                            label="Name"
                                            value={emailTemplate.name}
                                            fullWidth={true}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={3}
                                    style={{ padding: '5px' }}
                                >
                                    <Grid item xs={6}>
                                        <Select
                                            id="templateTypes"
                                            value={emailTemplate.type!}
                                            items={getTemplateTypes()}
                                            itemValueKey="id"
                                            itemLabelKey="name"
                                            onChange={(newValue) =>
                                                setEmailTemplate({
                                                    ...emailTemplate,
                                                    type: newValue,
                                                })
                                            }
                                            label="Template Type"
                                            showDefaultOption={false}
                                            disabled={true}
                                        />
                                    </Grid>
                                </Grid>
                                {incidentTypes && (
                                    <Grid
                                        container
                                        spacing={3}
                                        style={{ padding: '5px' }}
                                    >
                                        <Grid item xs={6}>
                                            <AutoComplete
                                                id="incidentTypes"
                                                fieldLabel={`${t(
                                                    'customLabel_incident'
                                                )} Types`}
                                                itemKey="id"
                                                itemLabel="name"
                                                items={incidentTypes}
                                                onChange={(
                                                    _event: any,
                                                    newValue: IIDAndName[]
                                                ) => {
                                                    setEmailTemplate({
                                                        ...emailTemplate,
                                                        incidentTypes: [
                                                            ...newValue,
                                                        ],
                                                    })
                                                }}
                                                selectedItems={
                                                    emailTemplate.incidentTypes ||
                                                    []
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid
                                    container
                                    spacing={3}
                                    style={{ padding: '5px' }}
                                >
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            required={true}
                                            variant="outlined"
                                            name="subject"
                                            label="Subject"
                                            value={emailTemplate.subject}
                                            fullWidth={true}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={3}
                                    style={{ padding: '5px' }}
                                >
                                    <Grid item xs={9}>
                                        <TextField
                                            size="medium"
                                            required={true}
                                            variant="outlined"
                                            name="body"
                                            label="Body"
                                            value={emailTemplate.body}
                                            fullWidth={true}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline={true}
                                            minRows={11}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <PlaceHolders
                                            templateType={emailTemplate.type!}
                                            onAddPlaceHolder={(s) =>
                                                addPlaceHolder(s)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={3}
                                    style={{ padding: '5px' }}
                                >
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        emailTemplate.attachLogo
                                                    }
                                                    onChange={handleChange}
                                                    color="primary"
                                                    name="attachLogo"
                                                />
                                            }
                                            label="Attach Logo"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            )}
            {(emailTemplate || !loading) && (
                <Container maxWidth={false}>
                    <ActionButtons
                        cancel={true}
                        onClickCancel={() => history.push('/email-templates')}
                        save={!!emailTemplate}
                        onClickSave={() => setSaveNow(true)}
                    />
                </Container>
            )}
        </>
    )
}

export default EmailTemplateDetails
