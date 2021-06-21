import React, {Fragment} from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Home";

const Navigation = () => {

    return (
        <Fragment>
            <Switch>

                <Route path="/" render={(props) => (
                    <Home {...props} />)} exact />
                <Route path="/home" render={(props) => (
                    <Home {...props} />)} exact />

            </Switch>
        </Fragment>
    );
}

export default Navigation;