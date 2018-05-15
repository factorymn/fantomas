// Page
import React, { Component, PropTypes as Type } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RequestActions, ModelActions } from 'actions';
import { Sidebar } from 'containers';
import './Page.styl';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import * as tools from 'utils/tools.js';

import bemCn from 'bem-cn-fast';
const b = bemCn('page');
const loader = bemCn('loader');

@connect(state => ({
  page: state.pageReducer,
  request: state.requestReducer,
  model: state.modelReducer,
}), dispatch => ({
  modelActions: bindActionCreators(ModelActions, dispatch),
  requestActions: bindActionCreators(RequestActions, dispatch)
}))

export default class Page extends Component {

  static propTypes = {
    page: Type.object,
    location: Type.object,
    children: Type.object,
    actions: Type.object,
    request: Type.object
  }

  constructor(props) {
    super(props);
    this.getRouteInfo = tools.getRouteInfo.bind(this);
  }

  componentDidMount() {
    this.props.modelActions.getAll();
  }

  handleRequestCloseSnackbar() {
    this.props.actions.snackBarHide();
  }

  render() {
    const { model } = this.props;

    return (
      <div className={b()}>
        <Sidebar models={model.models}/>
        <div className={b('content')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
