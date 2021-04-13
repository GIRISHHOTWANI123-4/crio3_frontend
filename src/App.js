import React from "react";
import Home from "./components/Home";
import AboutSystem from "./components/AboutSystem";
import SignIn from "./components/SignIn";
import Geofence from "./components/Geofence";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'}>
                    <SignIn/>
                </Route>
                <Route exact path={'/aboutsystem'}>
                    <AboutSystem/>
                </Route>
                <Route exact path={'/geofencing'}>
                    <Geofence/>
                </Route>
                <Route exact path={'/home'}>
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
