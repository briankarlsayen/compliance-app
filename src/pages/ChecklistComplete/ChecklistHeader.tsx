import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/CheckCircle'
import {
    withStyles,
    WithStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles'

const styles = (theme: Theme) =>
    createStyles({
        header: {
            backgroundColor: theme.palette.primary.dark
        }
    })

export interface IChecklistHeaderProps extends WithStyles<typeof styles> {
    onSubmitChecklist: any
}

const headerFn: React.FC<IChecklistHeaderProps> = (props) => {
    return (
        <AppBar
            position='fixed'
            className={props.classes.header}
            style={{ backgroundColor: '#00184c' }}
        >
            <Toolbar>
                <div style={{ flexGrow: 1, textAlign: 'right' }}></div>
                <Button
                    style={{
                        backgroundColor: 'white',
                        color: '#223d79',
                        border: '1px solid white',
                        padding: '5px 15px',
                        borderRadius: '4px'
                    }}
                    onClick={props.onSubmitChecklist}
                >
                    SUBMIT <SaveIcon style={{ marginLeft: 12 }} />
                </Button>
            </Toolbar>
        </AppBar>
    )
}

const ChecklistHeader = withStyles(styles)(headerFn)
export { ChecklistHeader }
