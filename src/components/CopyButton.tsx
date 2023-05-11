import { Button } from '@material-ui/core'
import { Done, FileCopyOutlined } from '@material-ui/icons'
import React, { useState } from 'react'

interface CopyButtonProps {
    value: string
}

const CopyButton = ({ value }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = (path: string) => {
        navigator.clipboard.writeText(value)
        setCopied(true)
    }

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={copied ? <Done /> : <FileCopyOutlined />}
            onClick={(e: React.MouseEvent) => handleCopy(value)}
        >
            {copied ? 'Copied' : 'Copy'}
        </Button>
    )
}

export default CopyButton
