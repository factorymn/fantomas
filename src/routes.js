import React, { PropTypes as Type } from 'react';
import moment from 'moment';
import { Route, Redirect, Switch } from 'react-router-dom';

import {
  Page,
  ModelNew,
  ModelShow,
  DataEdit,
} from './pages';

export default (config, cookies, location) => {
  return (
    <div>
        <Route
          path={`/`}
          render={props => (
            <div>
              <Page {...props}>
                <Switch>
                  <Route exact path={'/model/new'} component={ModelNew} />
                  <Route exact path={'/model/:id'} component={ModelShow} />
                  <Route exact path={'/model/:id/edit'} component={ModelNew} />
                  <Route exact path={'/model/:parentId/category/new'} component={ModelNew} />
                  <Route exact path={'/model/:parentId/category/:id/edit'} component={ModelNew} />
                  <Route exact path={'/model/:modelId/data/new'} component={DataEdit} />
                  <Route exact path={'/model/:modelId/data/:id/edit'} component={DataEdit} />
                </Switch>
              </Page>
            </div>
          )}
        />
    </div>
  );
};
