import { Container, MuiThemeProvider } from '@material-ui/core';
import oneplaceTheme from './theme/oneplace-theme';
import CheckLists from './pages/Checklists';
import Schedules from './pages/Schedules';
import ScheduleForm from './pages/ScheduleForm';

export default function App() {
  return (
    // <KeycloakProvider>
    <MuiThemeProvider theme={oneplaceTheme}>
      <Container maxWidth={false}>
        <CheckLists />
        {/* <Schedules /> */}
        {/* <ScheduleForm /> */}
      </Container>
    </MuiThemeProvider>
    // </KeycloakProvider>
  );
}
