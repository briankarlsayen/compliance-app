import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import CheckLists from './Checklists'
import ScheduleFormContainer from './ScheduleFormContainer'
import { fetchUserInfo } from '../api/userInfo'
import { FeatureFlagProvider } from '../feature/featureflag'
import { defaultFeatures } from '../feature/featureContext'
import Survey from './Survey'
import SurveyForm from './SurveyForm'
import ChecklistBuilder from './ChecklistBuilder'
import Settings from './Settings'
import Versions from './Versions'
import Promotion from './Promotion'
import Register from './Register'
import ChecklistReassign from './ChecklistReassign'
import ChecklistReport from './ChecklistReport'
import Schedules from './Schedules'
import ScheduleFrequencyForm from './ScheduleFrequencyForm'
import VersionStatusForm from './VersionStatusForm'

const ChecklistHome = () => {
    const [response, setResponse] = useState()

    const getUser = async () => {
        setResponse(await fetchUserInfo())
    }
    useEffect(() => {
        getUser()
    }, [])

    if (response !== undefined) {
        return (
            <FeatureFlagProvider
                features={{ features: { ...defaultFeatures.features } }}
            >
                <Switch>
                    <Route
                        exact
                        path="/checklists/:tempid/schedules/:id/edit"
                        component={ScheduleFormContainer}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/schedules/create"
                        component={ScheduleFormContainer}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/schedules/:id/frequency"
                        component={ScheduleFrequencyForm}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/surveys/:id/edit"
                        component={SurveyForm}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/surveys/create"
                        component={SurveyForm}
                    />
                    <Route exact path="/checklists" component={CheckLists} />
                    <Route
                        exact
                        path="/checklists/builder"
                        component={ChecklistBuilder}
                    />
                    <Route
                        exact
                        path="/checklists/settings"
                        component={Settings}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/surveys"
                        component={Survey}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/schedules"
                        component={Schedules}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/versions/:id/promote"
                        component={Promotion}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/versions/:id/status"
                        component={VersionStatusForm}
                    />
                    <Route
                        exact
                        path="/checklists/:tempid/versions"
                        component={Versions}
                    />
                    <Route
                        exact
                        path="/checklists/reassign"
                        component={ChecklistReassign}
                    />
                    <Route
                        exact
                        path="/checklists/report"
                        component={ChecklistReport}
                    />
                    <Route component={CheckLists} />
                </Switch>
            </FeatureFlagProvider>
        )
    } else {
        return <h1>Fetching...</h1>
    }
}

export default ChecklistHome
