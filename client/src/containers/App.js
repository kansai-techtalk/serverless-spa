import React from 'react';
import {
  HashRouter as Router,
  Route, Switch,
} from 'react-router-dom';
import Auth from '../components/Auth';
import Login from './screens/Login';
import Main from './Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Auth>
          <Route path="/" component={Main} />
        </Auth>
      </Switch>
    </Router>
  );
}

export default App;
