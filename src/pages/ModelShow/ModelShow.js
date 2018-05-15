// ModelNew
import React, { Component, PropTypes as Type } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModelActions, DataActions } from 'actions';
import { Title } from 'components';
import './ModelShow.styl';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import * as tools from 'utils/tools.js';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add-box';
import Categories from './Categories';
import ModelItems from './ModelItems';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import _get from 'lodash/get';
import { colors } from 'material-ui/styles';

import bemCn from 'bem-cn-fast';
const b = bemCn('model-show');
const loader = bemCn('loader');

const styles = {
  smallIcon: {
    width: 35,
    height: 35,
    fill: colors.blueA200
  },
  small: {
    width: 35,
    height: 35,
    padding: 0,
  }
};

@connect(state => ({
  model: state.modelReducer,
  data: state.dataReducer,
}), dispatch => ({
  modelActions: bindActionCreators(ModelActions, dispatch),
  dataActions: bindActionCreators(DataActions, dispatch),
}))

export default class ModelShow extends Component {

  static propTypes = {
  }

  state = {
    id: '',
    parentId: '',
    name: '',
    api: {
      name: '',
      route: ''
    },
    fields: {},
  }

  handleAddCategory = () => {

  }

  componentDidMount() {
    const models = this.props.modelActions.getAll();
    models.then(() => {
      const modelID = _get(this.props, 'match.params.id');
      const model = _get(this.props, `model.models.${modelID}`, {});
      this.props.dataActions.getAll(model);
    });
  }

  getChildModels = (models, model) => {
    const childModelsIds = _get(model, `childModels`, {});
    return Object.keys(childModelsIds).map((key) => models[key]);
  }

  handleRemove = (modelID) => {
    this.props.modelActions.remove(modelID);
  }

  render() {
    const modelID = _get(this.props, 'match.params.id');
    const model = _get(this.props, `model.models.${modelID}`, {});
    const childModels = this.getChildModels(_get(this.props, `model.models`, {}), model);
    const modelData = _get(this.props, `data.${modelID}`, []);

    return (
      <div className={b()}>
        <Title mods={{ size: 'h1' }}>
          <span>{model.name}</span>
          <IconButton
            iconStyle={styles.smallIcon}
            style={styles.small}
            containerElement={<Link to={`/model/${modelID}/data/new`} />}
          >
            <IconAdd />
          </IconButton>
        </Title>
        <Categories
          childModels={childModels}
          modelID={modelID}
          onRemove={this.handleRemove}
        />
        <ModelItems
          model={model}
          modelData={modelData}
        />
      </div>
    );
  }
}
