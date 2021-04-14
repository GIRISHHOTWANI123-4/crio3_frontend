import React from "react";
import Home from "./components/Home";
import AboutSystem from "./components/AboutSystem";
import SignIn from "./components/SignIn";
import Geofence from "./components/Geofence";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import useToken from "./components/useToken";

function App() {
    const {token, setToken} = useToken();
    if (!token) {
        return <SignIn setToken={setToken}/>
    }
    return (
        <Router>
            <Switch>
                <Route exact path={'/'}>
                    <Home/>
                </Route>
                <Route exact path={'/aboutsystem'}>
                    <AboutSystem/>
                </Route>
                <Route exact path={'/geofencing'}>
                    <Geofence/>
                </Route>
                <Route exact path={'/signin'}>
                    <App/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
