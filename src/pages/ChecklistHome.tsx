import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CheckLists from './Checklists'
import EditSchedule from './EditSchedule'

const ChecklistHome = () => {
    return (
        <Switch>
            <Route
                exact
                path="/checklists/schedules/:id"
                component={EditSchedule}
            />
            <Route exact path="/checklists" component={CheckLists} />
            <Route component={CheckLists} />
        </Switch>
    )
}

export default ChecklistHome
