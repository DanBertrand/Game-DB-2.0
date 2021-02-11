import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageList from './pages/pageList';
import PageDetails from './pages/pageDetails';

const App = () => (
  <>
    <h1>App</h1>
    <Router>
      <Switch>
        <Route path="/" exact>
          <PageList />
        </Route>
        <Route path="/pagedetails/:id">
          <PageDetails />
        </Route>
      </Switch>
    </Router>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
