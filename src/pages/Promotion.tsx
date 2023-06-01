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
} from '@material-ui/core'
import { blue } from '@mui/material/colors'
import { grey } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { fetchPromotionDetails } from '../api/checklist'
i18n.initialise()

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
})

export interface IPromoteInputField {
    id?: number
    name: string
    comment: string
}

export default function Promotion() {
    const classes = useStyles()
    const [inputField, setInputField] = useState<IPromoteInputField>({
        name: '',
        comment: '',
    })

    const fetchData = async () => {
        const response = await fetchPromotionDetails()
        setInputField({
            id: response.id,
            name: response.name,
            comment: response.comment,
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const blueTheme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    })

    const greyTheme = createTheme({
        palette: {
            primary: {
                main: grey[500],
            },
        },
    })

    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        alert(JSON.stringify(inputField))
    }

    const templateName = 'NQR-PW V1'

    return (
        <div>
            <Paper
                className={classes.root}
                elevation={3}
                style={{
                    padding: '2rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <Typography
                    style={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                >
                    Promote Template: {templateName}
                </Typography>
                <Typography style={{ paddingBottom: '1rem' }}>
                    You are about to promote Template: {templateName} version
                    Final to the current version
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Paper elevation={3}>
                            <Box style={{ padding: '2rem' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Enter a Version Name
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Box style={{ display: 'flex' }}>
                                            <TextField
                                                required
                                                id="name"
                                                name="name"
                                                label="name"
                                                fullWidth
                                                size="small"
                                                autoComplete="off"
                                                variant="outlined"
                                                value={inputField.name}
                                                onChange={updateField}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel
                                            style={{
                                                display: 'flex',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Enter Comment
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="comment"
                                            name="comment"
                                            label="comment"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
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
                                float: 'right',
                            }}
                        >
                            <ThemeProvider theme={greyTheme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    <Link
                                        to={`/checklists/versions`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                    >
                                        {i18n.t('cancel')}
                                    </Link>
                                </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={blueTheme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={handleSubmit}
                                >
                                    {i18n.t('save')}
                                </Button>
                            </ThemeProvider>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}