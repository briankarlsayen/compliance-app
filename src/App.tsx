import { Container, MuiThemeProvider } from '@material-ui/core'
import oneplaceTheme from './theme/oneplace-theme'
import CheckLists from './pages/Checklists'
import Schedules from './pages/Schedules'
import { HashRouter } from 'react-router-dom'
import ChecklistHome from './pages/ChecklistHome'

export default function App() {
    return (
        // <KeycloakProvider>
        <MuiThemeProvider theme={oneplaceTheme}>
            <Container maxWidth={false}>
                <HashRouter>
                    {/* <CheckLists /> */}
                    <ChecklistHome />
                </HashRouter>
                {/* <Schedules /> */}
                {/* <ScheduleForm /> */}
            </Container>
        </MuiThemeProvider>
        // </KeycloakProvider>
    )
}
