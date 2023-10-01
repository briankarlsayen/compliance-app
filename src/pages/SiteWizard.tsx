import React, { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    makeStyles
} from '@material-ui/core'
import { i18n } from '../i18n'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
i18n.initialise()

function SiteWizard() {
    return <StepOne />
}

const StepOne = () => {
    const [inputField, setInputField] = useState({
        siteName: '',
        franchisee: '',
        firstName: '',
        lastName: '',
        emailcc: '',
        unitNo: '',
        street: '',
        suburb: '',
        isLogin: false,
        isEmail: false,
        email: '',
        workPhone: '',
        homePhone: '',
        mobilePhone: '',
        postCode: '',
        city: '',
        country: ''
    })
    const [collapse, setCollapse] = useState({
        contact: true,
        address: true
    })
    const updateField = (e: any) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div style={{ paddingTop: '2rem' }}>
            <Card>
                <CardHeader
                    title={i18n.t('contact_details')}
                    action={
                        <IconButton
                            onClick={() =>
                                setCollapse({
                                    ...collapse,
                                    contact: !collapse.contact
                                })
                            }
                            aria-expanded={collapse.contact}
                            aria-label='Show more'
                            data-testid='contact-collapse-btn'
                        >
                            {collapse?.contact ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </IconButton>
                    }
                />
                <Collapse in={collapse.contact}>
                    <CardContent data-testid='contact-details'>
                        <Box display={{ md: 'flex' }} style={{ gap: '2rem' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel
                                        style={{
                                            display: 'flex',
                                            fontWeight: 700
                                        }}
                                    >
                                        First Name
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        id='firstName'
                                        name='firstName'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        variant='outlined'
                                        value={inputField.firstName}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel
                                        style={{
                                            display: 'flex',
                                            fontWeight: 700
                                        }}
                                    >
                                        Last Name
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        id='lastName'
                                        name='lastName'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        variant='outlined'
                                        value={inputField.lastName}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel
                                        style={{
                                            display: 'flex',
                                            fontWeight: 700
                                        }}
                                    >
                                        Email CC
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        id='emailcc'
                                        name='emailcc'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        variant='outlined'
                                        value={inputField.emailcc}
                                        onChange={updateField}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel
                                        style={{
                                            display: 'flex',
                                            fontWeight: 700
                                        }}
                                    >
                                        Work Phone
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        id='workPhone'
                                        name='workPhone'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        variant='outlined'
                                        value={inputField.workPhone}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel
                                        style={{
                                            display: 'flex',
                                            fontWeight: 700
                                        }}
                                    >
                                        Home Phone
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        id='homePhone'
                                        name='homePhone'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        variant='outlined'
                                        value={inputField.homePhone}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel
                                        style={{
                                            display: 'flex',
                                            fontWeight: 700
                                        }}
                                    >
                                        Mobile Phone
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        id='mobilePhone'
                                        name='mobilePhone'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        variant='outlined'
                                        value={inputField.mobilePhone}
                                        onChange={updateField}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default SiteWizard
