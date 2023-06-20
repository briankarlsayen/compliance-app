import React from 'react'
import { i18n } from '../i18n'
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
} from '@material-ui/core'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles,
} from '@material-ui/core/styles'
import { Grid } from '@mui/material'
import ChecklistPDFReport from '../components/ChecklistPDFReport'

i18n.initialise()

const Header = () => {
    return (
        <Box sx={{ display: 'flex', py: 2 }}>
            <Typography style={{ fontWeight: 500 }}>
                {i18n.t('pdf_custom_report')}
            </Typography>
        </Box>
    )
}

export default function ChecklistReports() {
    const Body = () => {
        return (
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBottom: '2rem',
                }}
            >
                <ChecklistPDFReport />
            </Box>
        )
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Body />
        </Box>
    )
}
