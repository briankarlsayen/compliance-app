import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    PaperProps,
    Typography
} from '@material-ui/core'
import { useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import QRCode from 'react-qr-code'

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle='#draggable-dialog-title'
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    )
}

export default function VersionDialog({ details }: any) {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const qrRef = useRef<any>(null)
    const [canvasLoaded, setCanvasLoaded] = useState(false)

    useEffect(() => {
        if (qrRef.current) {
            setCanvasLoaded(true)
        }
    }, [qrRef.current])

    return (
        <div>
            <Button variant='text' onClick={handleClickOpen}>
                Show QR code
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby='draggable-dialog-title'
            >
                <DialogTitle
                    style={{ cursor: 'move' }}
                    id='draggable-dialog-title'
                >
                    QR Code
                </DialogTitle>
                <DialogContent>
                    <Typography
                        component={'h2'}
                        variant='h1'
                        style={{
                            fontSize: '1.5rem',
                            margin: '1rem 0'
                        }}
                    >
                        {details?.name}
                    </Typography>
                    <QRCode
                        ref={qrRef}
                        size={256}
                        style={{
                            height: 'auto',
                            maxWidth: '100%',
                            width: '100%'
                        }}
                        value={details.qrValue}
                        viewBox={`0 0 256 256`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
