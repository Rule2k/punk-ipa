import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BeerDetailContainer from '../../containers/BeerDetailContainer';
import HomeContainer from '../../containers/ListOfBeersContainer';
import Layout from '../Layout';
import NotFoundPage from '../NotFoundPage';

const RouterComponent = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Layout shouldDisplayPagination>
              <HomeContainer />
            </Layout>
          </Route>
          <Route path="/beer/:id">
            <Layout>
              <BeerDetailContainer />
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
