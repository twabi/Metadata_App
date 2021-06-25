import React, {Fragment, useEffect} from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Interventions from "./Pages/Interventions";
import Components from "./Pages/Components";
import Subcomponents from "./Pages/Subcomponents";
import Activities from "./Pages/Activities";
import {getInstance} from "d2";

const Navigation = () => {
    const [interventions, setInterventions] = React.useState([]);
    const [activities, setActivities]= React.useState([]);
    const [components, setComponents] = React.useState([]);
    const [subcomponents, setSubcomponets] = React.useState([]);
    const [D2, setD2] = React.useState();

    useEffect(() => {
        getInstance().then((d2) => {
            setD2(d2);
            const inter = "optionSets/EnA0L04iZyx.json?fields=id,name,options[*]";
            const act = "optionSets/wjNZVBGZOOP.json?fields=id,name,options[*]";
            const comp = "optionSets/t16GxaaXdlX.json?fields=id,name,options[*]";
            const subComp = "optionSets/h7xYkE4uHCD.json?fields=id,name,options[*]";

            d2.Api.getApi().get(inter)
                .then((response) => {
                    console.log(response)
                    setInterventions(response.options);
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred: " + error);
                });

            d2.Api.getApi().get(act)
                .then((response) => {
                    console.log(response)
                    setActivities(response.options);
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred: " + error);
                });

            d2.Api.getApi().get(comp)
                .then((response) => {
                    console.log(response)
                    setComponents(response.options);
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred: " + error);
                });

            d2.Api.getApi().get(subComp)
                .then((response) => {
                    console.log(response)
                    setSubcomponets(response.options);
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred: " + error);
                });

        })

    }, []);


    return (
        <Fragment>
            <Switch>

                <Route path="/" render={(props) => (
                    <Home {...props} />)} exact />

                <Route path="/home" render={(props) => (
                    <Home {...props} />)} exact />

                <Route path="/interventions" render={(props) => (
                    <Interventions interventions={interventions} {...props} />)} exact />

                <Route path="/components" render={(props) => (
                    <Components components={components} {...props} />)} exact />

                <Route path="/subcomponents" render={(props) => (
                    <Subcomponents subcomponents={subcomponents} {...props} />)} exact />

                <Route path="/activities" render={(props) => (
                    <Activities activities={activities} {...props} />)} exact />

            </Switch>
        </Fragment>
    );
}

export default Navigation;