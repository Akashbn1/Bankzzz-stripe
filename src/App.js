import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Success from './Success';
import Cancel from './Cancel';
import Home from './Home'; // Your main home component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/success" component={Success} />
        <Route path="/cancel" component={Cancel} />
      </Switch>
    </Router>
  );
}

export default App;
