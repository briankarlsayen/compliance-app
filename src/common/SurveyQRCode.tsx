import React from 'react'
import QRCode from 'react-qr-code'
import { ISurvey } from '../pages/Survey'
import { Box, Button, Typography } from '@mui/material'

interface IDetails extends ISurvey {
    qrValue: string
}

interface ISurveyQRCode {
    details: IDetails
}

function SurveyQRCode({ details }: ISurveyQRCode) {
    const qrRef = React.useRef<any>(null)
    const downloadQR = () => {
        if (typeof window === undefined) {
            return
        }

        const svgElement = qrRef.current
        if (!svgElement) {
            return
        }
        const svgData = new XMLSerializer().serializeToString(svgElement)
        // create an image element
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = svgElement.clientWidth
            canvas.height = svgElement.clientHeight

            const context = canvas.getContext('2d')
            if (context) {
                context.drawImage(img, 0, 0, canvas.width, canvas.height)
                canvas.toBlob((blob) => {
                    if (blob) {
                        const link = document.createElement('a')
                        link.download = `qr-${details.path}.png`
                        link.href = URL.createObjectURL(blob)
                        link.click()
                    }
                })
            }
        }
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
    }
    return (
        <Box>
            <QRCode
                ref={qrRef}
                size={256}
                style={{
                    height: 'auto',
                    maxWidth: '200',
                    width: '200',
                }}
                value={details.qrValue}
                viewBox={`0 0 256 256`}
            />
            <Typography
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={downloadQR}
            >
                Download QR Code
            </Typography>
        </Box>
    )
}

export default SurveyQRCode
