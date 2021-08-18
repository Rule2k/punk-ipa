import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BeerDetail from '../BeerDetail';
import Home from '../Home';
import Layout from '../Layout';
import NotFoundPage from '../NotFoundPage';

const RouterComponent = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Layout>
              <Home />
            </Layout>
          </Route>
          <Route path="/beer/:id">
            <Layout>
              <BeerDetail />
            </Layout>
          </Route>
          <Route path="*">
            <Layout>
              <NotFoundPage />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default RouterComponent;
