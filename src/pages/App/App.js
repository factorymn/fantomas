// Author
import React, { Component, PropTypes as Type } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getRoutes from '../../routes';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import ProjectRawTheme from '../../theme/material_ui_raw_theme';
import { getMuiTheme } from 'material-ui/styles';
import DevTools from '../../pages/DevTools/DevTools';
import './App.styl';

const isProd = process.env.NODE_ENV === 'production';

@withRouter
@connect(state => ({
  router: state.router
}), dispatch => ({
}))

class Routing extends Component {

  static propTypes = {
    page: Type.object,
    router: Type.object,
    cookies: Type.instanceOf(Cookies).isRequired
  }

  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(ProjectRawTheme) };
  }

  render() {
    const { cookies, router } = this.props;
    const routes = getRoutes(cookies, router.location);

    return (
      <div>
        {!isProd ? <DevTools /> : ''}
        {routes}
      </div>
    );
  }
}
export default withCookies(Routing);
