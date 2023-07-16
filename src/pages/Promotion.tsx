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
    makeStyles
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import { grey } from '@material-ui/core/colors'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { changeStatusVersion } from '../api/checklist'
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
export interface IPromoteInputField {
    id?: number
    version: string
    comment?: string
}

interface IHistory {
    version: string
    status: string
}

export default function Promotion() {
    const classes = useStyles()
    const [inputField, setInputField] = useState<IPromoteInputField>({
        version: '',
        comment: ''
    })

    const history = useHistory<IHistory>()

    const fetchData = async () => {
        if (history.location.state) {
            setInputField(history?.location?.state)
        } else {
            history.push(backUrl)
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const reqBody = {
                ...inputField,
                status: 'current',
                tempid: Number(match.params?.tempid),
                id: Number(match.params?.id)
            }
            await changeStatusVersion(reqBody)
        } catch (error) {
            console.log('error', error)
        }
    }

    const match: MatchParams = useRouteMatch()
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
                                                {i18n.t('enter_version_name')}*
                                            </InputLabel>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Box style={{ display: 'flex' }}>
                                                <TextField
                                                    required
                                                    id='version'
                                                    name='version'
                                                    fullWidth
                                                    size='small'
                                                    autoComplete='off'
                                                    variant='outlined'
                                                    value={inputField.version}
                                                    onChange={updateField}
                                                />
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
