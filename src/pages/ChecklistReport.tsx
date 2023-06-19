import { i18n } from '../i18n'
import { Box, Typography } from '@material-ui/core'

import ChecklistPDFReport from '../components/ChecklistPDFReport'

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
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
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
