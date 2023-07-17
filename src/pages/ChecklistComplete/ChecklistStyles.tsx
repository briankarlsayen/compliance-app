import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) =>
    createStyles({
        root: {},
        appWrapper: {
            marginTop: 64,
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: 800,
            [theme.breakpoints.down('xs')]: {
                marginTop: 52
            }
        },
        tabWarningIcon: {
            width: '20px !important',
            height: '20px !important',
            marginLeft: 6,
            color: theme.palette.secondary.light
        },
        groupHeader: {
            padding: '16px 24px 8px'
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20
        },
        rightIcon: {
            marginLeft: theme.spacing(12)
        }
    })

export default styles
