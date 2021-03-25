import React from "react";
import Home from "./components/Home";
import AboutSystem from "./components/AboutSystem";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
function App() {
    return (
        <Router>
            <Switch>
              <Route exact path={'/'}>
                  <Home/>
              </Route>
              <Route exact path={'/aboutsystem'}>
                  <AboutSystem/>
              </Route>
            </Switch>
        </Router>
    );
}

export default App;
