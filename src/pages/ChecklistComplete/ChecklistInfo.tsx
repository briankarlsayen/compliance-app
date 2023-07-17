import React from 'react'
import Typography from '@material-ui/core/Typography'
import {
    withStyles,
    WithStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles'
// import {
//     IOneplaceLibraryContextProp,
//     IFranchisee,
//     ISite,
//     withOneplaceLibraryContext
// } from 'oneplace-components'

const styles = (theme: Theme) =>
    createStyles({
        checklistInfo: {
            background: theme.palette.primary.main,
            color: '#FFF',
            padding: '16px',
            paddingBottom: '8px',
            display: 'flex',
            justifyContent: 'space-between'
        }
    })

export interface IChecklistInfoProps extends WithStyles<typeof styles> {
    surveyName: string
    assignee: string
    franchisee?: any
    site?: any
}

const infoFn: React.FC<IChecklistInfoProps> = (props) => {
    const t = (key: string) => {
        return key
    }

    const assigneeTypeLabel =
        props.assignee === 'franchisee' ? 'framchisee' : 'site'
    const assigneeName =
        props.assignee === 'franchisee'
            ? props.franchisee!.name
            : props.site!.name

    return (
        <div className={props.classes.checklistInfo}>
            <div>
                <Typography variant='h5' color='inherit'>
                    {props.surveyName}
                </Typography>
                <Typography variant='body1' color='inherit'>
                    {assigneeTypeLabel + ': ' + assigneeName}
                </Typography>
            </div>
        </div>
    )
}

const ChecklistInfo = withStyles(styles)(infoFn)
export { ChecklistInfo }
