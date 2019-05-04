import React from 'react';
import {
  HashRouter as Router,
  Route, Switch,
} from 'react-router-dom';
import TodoList from './screens/TodoList';
import TodoEdit from './screens/TodoEdit';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route exact path="/edit" component={TodoEdit} />
      </Switch>
    </Router>
  );
}

export default App;
