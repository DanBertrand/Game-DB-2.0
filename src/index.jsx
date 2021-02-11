import './style/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageList from './pages/pageList';
import PageDetails from './pages/pageDetails';

const App = () => (

  <div className="app">
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
  </div>

);

ReactDOM.render(<App />, document.getElementById('root'));
