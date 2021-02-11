/* eslint-disable max-len */
import './style/style.scss';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageList from './pages/pageList';
import PageDetails from './pages/pageDetails';

const App = () => {
  const [didSearch, setDidSearch] = useState(false);
  const updateSearch = (string) => {
    if (string === 'keep') {
      setDidSearch(true);
    }
    if (string === 'remove') {
      setDidSearch(false);
    }
  };
  useEffect(() => { updateSearch(); }, []);

  return (

    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact>
            <PageList didSearch={didSearch} updateSearch={updateSearch} />
          </Route>
          <Route path="/pagedetails/:slug">
            <PageDetails />
          </Route>
        </Switch>
      </Router>
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById('root'));
