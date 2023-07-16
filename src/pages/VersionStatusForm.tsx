import { i18n } from '../i18n'

import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import {
    Typography,
    TextField,
    Box,
    Paper,
    InputLabel,
    Button,
    createTheme,
    ThemeProvider,
    makeStyles,
    Select,
    MenuItem,
    FormGroup
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import { grey } from '@material-ui/core/colors'
import { Link, useRouteMatch } from 'react-router-dom'
import { changeStatusVersion, fetchPromotionDetails } from '../api/checklist'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0
        }
    }
})

interface MatchParams {
    url: string
    params: {
        id: string
        tempid: string
    }
}

export interface IStatusInputField {
    id?: number
    status: string
    comment: string
}

export default function VersionStatusForm() {
    const classes = useStyles()
    const [inputField, setInputField] = useState<IStatusInputField>({
        status: '',
        comment: ''
    })

    const fetchData = async () => {
        const response = await fetchPromotionDetails()
        setInputField({
            id: response.id,
            status: response.status,
            comment: response.comment
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500]
            }
        }
    })

    const greyTheme = createTheme({
        palette: {
            primary: {
                main: grey[500]
            }
        }
    })

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value
        })
    }

    const templateName = 'NQR-PW V1'

    const statusList = [
        {
            id: 1,
            name: 'Draft',
            value: 'draft'
        },
        {
            id: 2,
            name: 'Archived',
            value: 'archived'
        }
    ]

    const match: MatchParams = useRouteMatch()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const reqBody = {
                ...inputField,
                tempid: Number(match.params?.tempid),
                id: Number(match.params?.id)
            }
            await changeStatusVersion(reqBody)
        } catch (error) {
            console.log('error', error)
        }
    }

    const urlArr = match.url.split('/')
    urlArr.pop()
    urlArr.pop()
    const backUrl = urlArr.join('/')
    return (
        <div>
            <Paper
                className={classes.root}
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem'
                }}
            >
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                >
                    {i18n.t('promote_template')}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Paper elevation={3}>
                                <Box style={{ padding: '2rem' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4}>
                                            <InputLabel
                                                style={{
                                                    display: 'flex',
                                                    fontWeight: 700
                                                }}
                                            >
                                                New Status*
                                            </InputLabel>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Box style={{ display: 'flex' }}>
                                                <Select
                                                    style={{
                                                        minWidth: '300px'
                                                    }}
                                                    name='status'
                                                    labelId='demo-simple-select-label'
                                                    id='status'
                                                    value={inputField.status}
                                                    onChange={updateField}
                                                    variant='outlined'
                                                    MenuProps={{
                                                        anchorOrigin: {
                                                            vertical: 'bottom',
                                                            horizontal: 'left'
                                                        },
                                                        transformOrigin: {
                                                            vertical: 'top',
                                                            horizontal: 'left'
                                                        },
                                                        getContentAnchorEl: null
                                                    }}
                                                    required
                                                >
                                                    {statusList.map((item) => (
                                                        <MenuItem
                                                            key={item.id}
                                                            value={item.value}
                                                        >
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <InputLabel
                                                style={{
                                                    display: 'flex',
                                                    fontWeight: 700
                                                }}
                                            >
                                                {i18n.t('enter_comment')}*
                                            </InputLabel>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField
                                                required
                                                id='comment'
                                                name='comment'
                                                fullWidth
                                                size='small'
                                                autoComplete='off'
                                                variant='outlined'
                                                value={inputField.comment}
                                                onChange={updateField}
                                                multiline
                                                minRows={3}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ alignSelf: 'end', paddingTop: 24 }}
                        >
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '1rem',
                                    float: 'right'
                                }}
                            >
                                <ThemeProvider theme={greyTheme}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        size='small'
                                    >
                                        <Link
                                            to={backUrl}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}
                                        >
                                            {i18n.t('cancel')}
                                        </Link>
                                    </Button>
                                </ThemeProvider>
                                <ThemeProvider theme={blueTheme}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        size='small'
                                        type='submit'
                                    >
                                        {i18n.t('save')}
                                    </Button>
                                </ThemeProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}
