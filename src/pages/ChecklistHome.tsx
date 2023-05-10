import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import CheckLists from './Checklists'
import EditSchedule from './EditSchedule'
import { fetchUserInfo } from '../api/userInfo'
import { FeatureFlagProvider } from '../feature/featureflag'
import { defaultFeatures } from '../feature/featureContext'
import Survey from './Survey'
import SurveyForm from './SurveyForm'

const ChecklistHome = () => {
    const [response, setResponse] = useState()

    const getUser = async () => {
        setResponse(await fetchUserInfo())
    }
    useEffect(() => {
        getUser()
    }, [])

    if (response) {
        console.log('response', response)
        return (
            <FeatureFlagProvider
                features={{ features: { ...defaultFeatures.features } }}
            >
                <Switch>
                    <Route
                        exact
                        path="/checklists/schedules/:id"
                        component={EditSchedule}
                    />
                    <Route exact path="/surveys/:id" component={SurveyForm} />
                    <Route exact path="/checklists" component={CheckLists} />
                    <Route exact path="/surveys" component={Survey} />
                    <Route component={CheckLists} />
                </Switch>
            </FeatureFlagProvider>
        )
    } else {
        return <h1>Fetching...</h1>
    }
}

export default ChecklistHome
