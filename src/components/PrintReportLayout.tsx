import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import {
    Theme,
    ThemeProvider,
    createStyles,
    createTheme,
    makeStyles,
    withStyles,
} from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors'

export default function PrintReportLayout() {
    const PDFHeader = () => {
        return (
            <Typography
                sx={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#555555',
                    borderBottom: '2px solid  #555555',
                }}
            >
                Darrell Conditional Question
            </Typography>
        )
    }

    const tableData = [
        {
            question: 'trigger select box',
            answer: 'true',
        },
        {
            question: 'trigger select box',
            answer: 'true',
        },
        {
            question: 'trigger select box',
        },
        {
            question: 'trigger select box',
        },
        {
            question: 'trigger select box',
        },
    ]

    const PDFBody = () => {
        return (
            <Grid container>
                <Grid
                    item
                    md={12}
                    sx={{
                        borderTop: '2px solid #555555',
                        borderBottom: '2px solid #555555',
                        p: 1,
                        fontSize: '1.2rem',
                        color: '#555555',
                        fontWeight: 500,
                    }}
                >
                    <Grid container>
                        <Grid item md={6}>
                            <Typography> QUESTIONS</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography> ANSWERS</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12} sx={{ p: 1 }}>
                    <Typography>GROUP ONE</Typography>
                </Grid>
                {tableData.map(({ question, answer }, index) => {
                    return (
                        <Grid item md={12}>
                            <Grid
                                container
                                style={{
                                    backgroundColor:
                                        (1 + index) % 2 !== 0
                                            ? '#F5F5F5'
                                            : 'white',
                                    padding: '.8rem',
                                }}
                            >
                                <Grid item md={6}>
                                    <Typography>
                                        <span style={{ fontWeight: 600 }}>
                                            Q{index + 1}.
                                        </span>{' '}
                                        {question}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>{answer ?? ''}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }
    return (
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <PDFHeader />
            <PDFBody />
        </Box>
    )
}
