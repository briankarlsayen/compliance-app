import {
    ThemeProvider,
    createTheme,
    makeStyles,
} from '@material-ui/core/styles'
import { Button, Typography, Box, Modal, Fade } from '@material-ui/core'
import { grey } from '@mui/material/colors'
import { Circle } from '@mui/icons-material'

interface PTableModal {
    usersSched: string[]
    handleCloseModal: () => void
    show: boolean
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
}

const greyTheme = createTheme({
    palette: {
        primary: {
            main: grey[500],
        },
    },
})

const modalStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        minWidth: '300px',
        maxHeight: '500px',
        overflow: 'auto',
    },
}))

const TableModal = ({ usersSched, handleCloseModal }: PTableModal) => {
    const forUsers = [] as string[]
    const show = Boolean(usersSched)
    forUsers.push(...usersSched)
    const mid = Math.ceil(forUsers.length / 2)
    const leftItems = forUsers.slice(0, mid)
    const rightItems = forUsers.slice(mid)
    const classes = modalStyles()
    return (
        <Modal
            className={classes.modal}
            open={show}
            onClose={handleCloseModal}
            closeAfterTransition
            style={{ border: 'none' }}
        >
            <Fade in={show}>
                <Box sx={style}>
                    <Box
                        style={{
                            padding: '1.2rem',
                            backgroundColor: '#2196F3',
                        }}
                    >
                        <Typography
                            id="modal-title"
                            variant="h2"
                            style={{
                                fontWeight: 'bold',
                                color: 'white',
                                boxShadow: '1px',
                            }}
                        >
                            Schedule For
                        </Typography>
                    </Box>
                    <Box>
                        <div
                            style={{
                                margin: 0,
                                padding: 0,
                                paddingRight: '1rem',
                                paddingLeft: '1rem',
                            }}
                        >
                            {forUsers && (
                                <div
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    <div style={{ width: '100%' }}>
                                        {leftItems.map((item, index) => (
                                            <Typography
                                                key={index}
                                                id="modal-modal-title"
                                                component="h2"
                                                style={{
                                                    display: 'flex',
                                                    padding: '.5rem',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Circle
                                                    sx={{
                                                        fontSize: 6,
                                                        marginRight: '.5rem',
                                                    }}
                                                />
                                                {item}
                                            </Typography>
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        {rightItems.map((item, index) => (
                                            <Typography
                                                key={index}
                                                id="modal-modal-title"
                                                component="h2"
                                                style={{
                                                    display: 'flex',
                                                    padding: '.5rem',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Circle
                                                    sx={{
                                                        fontSize: 6,
                                                        marginRight: '.5rem',
                                                    }}
                                                />

                                                {item}
                                            </Typography>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            padding: '.5rem',
                            borderTop: '1px solid #dfdfdf',
                        }}
                    >
                        <ThemeProvider theme={greyTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    color: 'white',
                                }}
                                onClick={handleCloseModal}
                            >
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="body2"
                                >
                                    Close
                                </Typography>
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default TableModal
