import '../styles/styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import normalRoutes from '../routes/route';


function App() {
  return (
    <Router>
      <Switch>
        {normalRoutes.map((eachRoute) => (
          <Route
            key={eachRoute.url}
            path={eachRoute.url}
            exact
            render={props => (
              <eachRoute.component props={props} />
            )}
          />
        ))}
        </Switch>
    </Router>
  );
}

export default App;
