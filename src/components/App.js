
import React from 'react';
import '../styles/styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import normalRoutes from '../routes/route';
import Main from './Main';


function App() {
  return (
    <Router>
      <Switch>
        {normalRoutes.map((eachRoute) => (
          <Route
            key={eachRoute.url}
            path={eachRoute.url}
            exact
            render={props => <Main props={props} eachRoute={eachRoute} />}
          />
        ))}
        </Switch>
    </Router>
  );
}

export default App;
