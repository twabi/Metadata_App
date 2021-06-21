import React, {Fragment} from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Interventions from "./Pages/Interventions";
import Components from "./Pages/Components";
import Subcomponents from "./Pages/Subcomponents";
import Activities from "./Pages/Activities";

const Navigation = () => {

    return (
        <Fragment>
            <Switch>

                <Route path="/home" render={(props) => (
                    <Home {...props} />)} exact />
                <Route path="/interventions" render={(props) => (
                    <Interventions {...props} />)} exact />
                <Route path="/components" render={(props) => (
                    <Components {...props} />)} exact />
                <Route path="/subcomponents" render={(props) => (
                    <Subcomponents {...props} />)} exact />
                <Route path="/activities" render={(props) => (
                    <Activities {...props} />)} exact />

            </Switch>
        </Fragment>
    );
}

export default Navigation;