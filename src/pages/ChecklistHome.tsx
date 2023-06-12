import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import CheckLists from "./Checklists";
import EditSchedule from "./EditSchedule";
import { fetchUserInfo } from "../api/userInfo";
import { FeatureFlagProvider } from "../feature/featureflag";
import { defaultFeatures } from "../feature/featureContext";
import Survey from "./Survey";
import SurveyForm from "./SurveyForm";
import EditScheduleFrequency from "./EditScheduleFrequency";
import ChecklistBuilder from "./ChecklistBuilder";
import Settings from "./Settings";
import Versions from "./Versions";
import Promotion from "./Promotion";
import Register from "./Register";
import ChecklistReassign from "./ChecklistReassign";

const ChecklistHome = () => {
  const [response, setResponse] = useState();

  const getUser = async () => {
    setResponse(await fetchUserInfo());
  };
  useEffect(() => {
    getUser();
  }, []);

  if (response !== undefined) {
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
          <Route
            exact
            path="/checklists/schedules/frequency/:id"
            component={EditScheduleFrequency}
          />
          <Route exact path="/checklists/surveys/:id" component={SurveyForm} />
          <Route exact path="/checklists" component={CheckLists} />
          <Route
            exact
            path="/checklists/builder"
            component={ChecklistBuilder}
          />
          <Route exact path="/checklists/settings" component={Settings} />
          <Route exact path="/checklists/surveys" component={Survey} />
          <Route
            exact
            path="/checklists/versions/promote/:id"
            component={Promotion}
          />
          <Route exact path="/checklists/versions" component={Versions} />

          <Route component={CheckLists} />
          <Route
            exact
            path="/checklists/reassign"
            component={ChecklistReassign}
          />
        </Switch>
      </FeatureFlagProvider>
    );
  } else {
    return <h1>Fetching...</h1>;
  }
};

export default ChecklistHome;
