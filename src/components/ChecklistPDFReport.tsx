import { i18n } from '../i18n'
import Select from '../common/Select'
import ChecklistPDFTable from './ChecklistPDFTable'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { ExpandLessOutlined, ExpandMoreOutlined } from '@material-ui/icons'
import {
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    TableCell,
    Checkbox,
    Button,
    Paper,
    Typography,
    FormControl,
    Grid,
    TextField,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core'

i18n.initialise()

interface IHeader {
    name: boolean
    due_date: boolean
    creator: boolean
    template: boolean
    creation_date: boolean
    version: boolean
}

interface IContactDetails {
    centre: boolean
    email: boolean
    room: boolean
    address: boolean
    name: boolean
    phone: boolean
}

interface IPDFSettings {
    scoring: boolean
    selectable_answers: boolean
    charts: boolean
    tickets: boolean
    photos: boolean
    hide_question_num: boolean
    hide_unanswered_question: boolean
    hide_info_panel: boolean
    print_pdf_landscape: boolean
}

interface IGroup {
    follow_checklist_template: boolean
    show_all: boolean
}

interface IReportTableProps {
    name: string
    template: string
    centre: string
    room: string
    id: number
}

interface IChecklistPDFReportProps {
    logo: string
    layout: string
    name: string
    title: string
    header?: IHeader
    contact_details?: IContactDetails
    pdf_settings?: IPDFSettings
    group?: IGroup
    questions?: IGroup
    answer_labels?: IGroup
    table_data?: IReportTableProps[]
}

export default function ChecklistPDFReport() {
    const defaultVal = {
        logo: '',
        layout: '',
        name: '',
        title: '',
    }

    const [inputField, setInputField] =
        useState<IChecklistPDFReportProps>(defaultVal)
    console.log(
        '🚀 ~ file: ChecklistPDFReport.tsx:46 ~ ChecklistPDFReport ~ inputField:',
        inputField
    )
    const CustomReport = () => {
        const logoPropsContainer = {
            id: 'logo',
            value: inputField.logo!,
            itemValueKey: 'id',
            items: [
                {
                    id: 1,
                    name: 'No Logo',
                },
                {
                    id: 2,
                    name: 'With Logo',
                },
            ],
            onChange: (e: any) => setInputField({ ...inputField, logo: e.id }),
            itemLabelKey: 'name',
        }

        const layoutPropsContainer = {
            id: 'layout',
            value: inputField.layout!,
            itemValueKey: 'id',
            items: [
                {
                    id: 1,
                    name: 'Select Layout',
                },
                {
                    id: 2,
                    name: 'Sample Layout',
                },
            ],
            onChange: (e: any) =>
                setInputField({ ...inputField, layout: e.id }),
            itemLabelKey: 'name',
        }
        return (
            <Paper
                elevation={3}
                style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    // marginBottom: "2rem",
                }}
            >
                <Typography> {i18n.t('custom_report')}</Typography>
                <Box style={{ padding: '1rem' }}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Grid container>
                                <Grid
                                    item
                                    xs={4}
                                    md={4}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {i18n.t('logo')}
                                </Grid>
                                <Grid item xs={8} md={8}>
                                    <Select {...logoPropsContainer} />
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    md={4}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {i18n.t('layout')}
                                </Grid>
                                <Grid item xs={8} md={8}>
                                    <Select {...layoutPropsContainer} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        )
    }
    const namePropsContainer = {
        name: 'name',
        inputField: inputField,
        setInputField,
        value: inputField.name!,
        table_data: inputField.table_data!,
    }

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CustomReport />
            <LayoutDetails {...namePropsContainer} />
            <ChecklistPDFTable {...namePropsContainer} />
        </Box>
    )
}

interface ITextFieldProps {
    name: string
    value: any
    inputField: IChecklistPDFReportProps
    setInputField: Dispatch<SetStateAction<IChecklistPDFReportProps>>
}
interface IExpandProps {
    header: boolean
    contact: boolean
    pdfSettings: boolean
    groups: boolean
    questions: boolean
    answerLabels: boolean
}

const LayoutDetails = (props: ITextFieldProps) => {
    const { inputField, setInputField } = props ?? {}
    const defaultExpandVal = {
        header: false,
        contact: false,
        pdfSettings: false,
        groups: false,
        questions: false,
        answerLabels: false,
    }
    const [expand, setExpand] = useState<IExpandProps>(defaultExpandVal)
    const namePropsContainer = {
        name: 'name',
        inputField: inputField,
        setInputField,
        value: inputField.name,
    }

    const titlePropsContainer = {
        id: 'title',
        value: inputField.title!,
        itemValueKey: 'id',
        items: [
            {
                id: 1,
                name: 'Select Title',
            },
            {
                id: 2,
                name: 'Sample Title',
            },
        ],
        onChange: (e: any) => setInputField({ ...inputField, title: e.id }),
        itemLabelKey: 'name',
    }

    const handleInputObj = (
        parentObjName: string,
        parentObj: object,
        e: any
    ) => {
        const { checked, name } = e.target

        setInputField({
            ...inputField,
            [parentObjName]: { ...parentObj, [name]: checked },
        })
    }

    const handleRadioObj = (
        parentObjName: string,
        parentObj: object,
        e: any
    ) => {
        const { checked, name } = e.target

        setInputField({
            ...inputField,
            [parentObjName]: {
                follow_checklist_template:
                    name === 'follow_checklist_template' ? checked : false,
                show_all: name === 'show_all' ? checked : false,
            },
        })
    }

    const headerCheckBox = [
        {
            label: 'Show Name',
            value: inputField.header?.name!,
            onChange: (e: any) =>
                handleInputObj('header', inputField?.header!, e),
            name: 'name',
        },
        {
            label: 'Show Due Date',
            value: inputField.header?.due_date!,
            onChange: (e: any) =>
                handleInputObj('header', inputField?.header!, e),
            name: 'due_date',
        },
        {
            label: 'Show Creator',
            value: inputField.header?.creator!,
            onChange: (e: any) =>
                handleInputObj('header', inputField?.header!, e),
            name: 'creator',
        },
        {
            label: 'Show Template',
            value: inputField.header?.template!,
            onChange: (e: any) =>
                handleInputObj('header', inputField?.header!, e),
            name: 'template',
        },
        {
            label: 'Show Creation Date',
            value: inputField.header?.creation_date!,
            onChange: (e: any) =>
                handleInputObj('header', inputField?.header!, e),
            name: 'creation_date',
        },
        {
            label: 'Show Version',
            value: inputField.header?.version!,
            onChange: (e: any) =>
                handleInputObj('header', inputField?.header!, e),
            name: 'version',
        },
    ]

    const contactCheckbox = [
        {
            label: 'Show Centre',
            value: inputField.contact_details?.centre!,
            onChange: (e: any) =>
                handleInputObj(
                    'contact_details',
                    inputField?.contact_details!,
                    e
                ),
            name: 'centre',
        },
        {
            label: 'Show E-mail',
            value: inputField.contact_details?.email!,
            onChange: (e: any) =>
                handleInputObj(
                    'contact_details',
                    inputField?.contact_details!,
                    e
                ),
            name: 'email',
        },
        {
            label: 'Show Room',
            value: inputField.contact_details?.room!,
            onChange: (e: any) =>
                handleInputObj(
                    'contact_details',
                    inputField?.contact_details!,
                    e
                ),
            name: 'room',
        },
        {
            label: 'Show Address',
            value: inputField.contact_details?.address!,
            onChange: (e: any) =>
                handleInputObj(
                    'contact_details',
                    inputField?.contact_details!,
                    e
                ),
            name: 'address',
        },
        {
            label: 'Show Name',
            value: inputField.contact_details?.name!,
            onChange: (e: any) =>
                handleInputObj(
                    'contact_details',
                    inputField?.contact_details!,
                    e
                ),
            name: 'name',
        },
        {
            label: 'Show Phone',
            value: inputField.contact_details?.phone!,
            onChange: (e: any) =>
                handleInputObj(
                    'contact_details',
                    inputField?.contact_details!,
                    e
                ),
            name: 'phone',
        },
    ]

    const pdfSettingsCheckbox = [
        {
            label: 'Show scoring',
            value: inputField.pdf_settings?.scoring!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'scoring',
        },
        {
            label: 'Show all selectable answers',
            value: inputField.pdf_settings?.selectable_answers!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'selectable_answers',
        },
        {
            label: 'Show charts',
            value: inputField.pdf_settings?.charts!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'charts',
        },
        {
            label: "Show tickets (based on user's profile)",
            value: inputField.pdf_settings?.tickets!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'tickets',
        },
        {
            label: 'Show photos at the bottom of each group',
            value: inputField.pdf_settings?.photos!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'photos',
        },
        {
            label: 'Hide question numbers',
            value: inputField.pdf_settings?.hide_question_num!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'hide_question_num',
        },
        {
            label: 'Hide unanswered questions/groups',
            value: inputField.pdf_settings?.hide_unanswered_question!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'hide_unanswered_question',
        },
        {
            label: 'Hide information panel questions',
            value: inputField.pdf_settings?.hide_info_panel!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'hide_info_panel',
        },
        {
            label: 'Print PDF report in landscape mode',
            value: inputField.pdf_settings?.print_pdf_landscape!,
            onChange: (e: any) =>
                handleInputObj('pdf_settings', inputField?.pdf_settings!, e),
            name: 'print_pdf_landscape',
        },
    ]

    const groupsRadioBtn = [
        {
            label: 'Follow checklist template',
            value: 'follow_checklist_template',
            name: 'follow_checklist_template',
        },
        {
            label: 'Show all (overide template setting)',
            value: 'show_all',
            name: 'show_all',
        },
    ]

    return (
        <Paper
            elevation={3}
            style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                // marginBottom: "2rem",
            }}
        >
            <Typography> {i18n.t('layout_details')}</Typography>
            <Box style={{ padding: '1rem' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <Grid
                                item
                                xs={4}
                                md={4}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {i18n.t('checklist_name')}
                            </Grid>
                            <Grid item xs={8} md={8}>
                                <OutlinedTextField {...namePropsContainer} />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={4}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {i18n.t('title')}
                            </Grid>
                            <Grid item xs={8} md={8}>
                                <Select {...titlePropsContainer} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {/* <Box sx={{ py: 5 }}> */}
                        <Grid container spacing={2} component={Paper}>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                style={{
                                    backgroundColor: '#9e9e9e',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingLeft: 5,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    style={{ color: 'white', fontWeight: 500 }}
                                >
                                    {i18n.t('header')}
                                </Typography>
                                <Button
                                    style={{
                                        color: 'white',
                                        background: '#9E9E9E',
                                    }}
                                    onClick={() =>
                                        setExpand({
                                            ...expand,
                                            header: !expand.header,
                                        })
                                    }
                                >
                                    {expand.header ? (
                                        <ExpandMoreOutlined />
                                    ) : (
                                        <ExpandLessOutlined />
                                    )}
                                </Button>
                            </Grid>
                            {expand.header && (
                                <Grid item xs={12} md={12}>
                                    <Grid container>
                                        {headerCheckBox?.map(
                                            ({ label, ...rest }) => (
                                                <Grid item md={6}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                {...rest}
                                                            />
                                                        }
                                                        label={label}
                                                    />
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        {/* </Box> */}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {/* <Box sx={{ py: 5 }}> */}
                        <Grid container spacing={2} component={Paper}>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                style={{
                                    backgroundColor: '#9e9e9e',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingLeft: 5,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    style={{ color: 'white', fontWeight: 500 }}
                                >
                                    {i18n.t('contact_details')}
                                </Typography>
                                <Button
                                    style={{
                                        color: 'white',
                                        background: '#9E9E9E',
                                    }}
                                    onClick={() =>
                                        setExpand({
                                            ...expand,
                                            contact: !expand.contact,
                                        })
                                    }
                                >
                                    {expand.contact ? (
                                        <ExpandMoreOutlined />
                                    ) : (
                                        <ExpandLessOutlined />
                                    )}
                                </Button>
                            </Grid>
                            {expand.contact && (
                                <Grid item md={12}>
                                    <Grid container>
                                        {contactCheckbox?.map(
                                            ({ label, ...rest }) => (
                                                <Grid item md={6}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                {...rest}
                                                            />
                                                        }
                                                        label={label}
                                                    />
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        {/* </Box> */}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2} component={Paper}>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                style={{
                                    backgroundColor: '#9e9e9e',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingLeft: 5,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    style={{ color: 'white', fontWeight: 500 }}
                                >
                                    {i18n.t('pdf_settings')}
                                </Typography>
                                <Button
                                    style={{
                                        color: 'white',
                                        background: '#9E9E9E',
                                    }}
                                    onClick={() =>
                                        setExpand({
                                            ...expand,
                                            pdfSettings: !expand.pdfSettings,
                                        })
                                    }
                                >
                                    {expand.pdfSettings ? (
                                        <ExpandMoreOutlined />
                                    ) : (
                                        <ExpandLessOutlined />
                                    )}
                                </Button>
                            </Grid>
                            {expand.pdfSettings && (
                                <Grid item md={12}>
                                    <Grid container>
                                        {pdfSettingsCheckbox?.map(
                                            ({ label, ...rest }) => (
                                                <Grid item xs={6} md={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                {...rest}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={label}
                                                    />
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2} component={Paper}>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                style={{
                                    backgroundColor: '#9e9e9e',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingLeft: 5,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    style={{ color: 'white', fontWeight: 500 }}
                                >
                                    {i18n.t('groups')}
                                </Typography>
                                <Button
                                    style={{
                                        color: 'white',
                                        background: '#9E9E9E',
                                    }}
                                    onClick={() =>
                                        setExpand({
                                            ...expand,
                                            groups: !expand.groups,
                                        })
                                    }
                                >
                                    {expand.groups ? (
                                        <ExpandMoreOutlined />
                                    ) : (
                                        <ExpandLessOutlined />
                                    )}
                                </Button>
                            </Grid>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                style={{ width: '100%' }}
                                onChange={(e: any) =>
                                    handleRadioObj(
                                        'group',
                                        inputField?.group!,
                                        e
                                    )
                                }
                            >
                                {expand.groups && (
                                    <Grid item md={12}>
                                        <Grid container style={{ padding: 5 }}>
                                            {groupsRadioBtn?.map(
                                                ({ label, ...rest }) => (
                                                    <Grid item xs={6} md={6}>
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    {...rest}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={label}
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </Grid>
                                )}
                            </RadioGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2} component={Paper}>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                style={{
                                    backgroundColor: '#9e9e9e',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingLeft: 5,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    style={{ color: 'white', fontWeight: 500 }}
                                >
                                    {i18n.t('questions')}
                                </Typography>
                                <Button
                                    style={{
                                        color: 'white',
                                        background: '#9E9E9E',
                                    }}
                                    onClick={() =>
                                        setExpand({
                                            ...expand,
                                            questions: !expand.questions,
                                        })
                                    }
                                >
                                    {expand.questions ? (
                                        <ExpandMoreOutlined />
                                    ) : (
                                        <ExpandLessOutlined />
                                    )}
                                </Button>
                            </Grid>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                style={{ width: '100%' }}
                                onChange={(e: any) =>
                                    handleRadioObj(
                                        'questions',
                                        inputField?.questions!,
                                        e
                                    )
                                }
                            >
                                {expand.questions && (
                                    <Grid item md={12}>
                                        <Grid container style={{ padding: 5 }}>
                                            {groupsRadioBtn?.map(
                                                ({ label, ...rest }) => (
                                                    <Grid item xs={6} md={6}>
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    {...rest}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={label}
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </Grid>
                                )}
                            </RadioGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2} component={Paper}>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                style={{
                                    backgroundColor: '#9e9e9e',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingLeft: 5,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    style={{ color: 'white', fontWeight: 500 }}
                                >
                                    {i18n.t('answer_labels')}
                                </Typography>
                                <Button
                                    style={{
                                        color: 'white',
                                        background: '#9E9E9E',
                                    }}
                                    onClick={() =>
                                        setExpand({
                                            ...expand,
                                            answerLabels: !expand.answerLabels,
                                        })
                                    }
                                >
                                    {expand.answerLabels ? (
                                        <ExpandMoreOutlined />
                                    ) : (
                                        <ExpandLessOutlined />
                                    )}
                                </Button>
                            </Grid>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                style={{ width: '100%' }}
                                onChange={(e: any) =>
                                    handleRadioObj(
                                        'answer_labels',
                                        inputField?.answer_labels!,
                                        e
                                    )
                                }
                            >
                                {expand.answerLabels && (
                                    <Grid item md={12}>
                                        <Grid container style={{ padding: 5 }}>
                                            {groupsRadioBtn?.map(
                                                ({ label, ...rest }) => (
                                                    <Grid item xs={6} md={6}>
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    {...rest}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={label}
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </Grid>
                                )}
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

const OutlinedTextField = (props: ITextFieldProps) => {
    const { name, inputField, value, setInputField } = props ?? {}
    return (
        <TextField
            // required
            id={name}
            name={name}
            // label="name"
            fullWidth
            size="small"
            variant="outlined"
            value={value}
            onChange={
                (e: any) => {
                    setInputField({ ...inputField, [name]: e.target.value })
                }

                // console.log(e.target.value)
            }
        />
    )
}
