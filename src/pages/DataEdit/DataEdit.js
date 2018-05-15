// DataEdit
import React, { Component, PropTypes as Type } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModelActions, DataActions } from 'actions';
import { Title } from 'components';
import './DataEdit.styl';
import * as tools from 'utils/tools.js';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { inputComponents } from 'inputcomponents';

import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _find from 'lodash/find';


import bemCn from 'bem-cn-fast';
const b = bemCn('data-edit');
const loader = bemCn('loader');

@connect(state => ({
  page: state.pageReducer,
  model: state.modelReducer,
}), dispatch => ({
  modelActions: bindActionCreators(ModelActions, dispatch),
  dataActions: bindActionCreators(DataActions, dispatch),
}))

export default class DataEdit extends Component {

  static propTypes = {
  }

  state = {
    model: {},
    form: {}
  }

  componentDidMount() {
    const modelID = _get(this.props, 'match.params.modelId');
    const models = this.props.modelActions.getAll();
    models.then(() => {
      const model = _get(this.props, `model.models.${modelID}`);
      this.setState({ model });
    });
  }

  handleSave = () => {
    const { model, form } = this.state;
    this.props.dataActions.create(model, form);
  }

  handleChangeField = (name, e, data) => {
    const form = _cloneDeep(this.state.form);
    // form[name] = data || e;
    form[name] = data;
    this.setState({ form });
  }

  getView(inputTypeId) {
    let View = _get(_find(inputComponents, { name: inputTypeId }), 'component') || TextField;
    return View;
  }

  renderFields() {
    const { model, form } = this.state;
    return Object.keys(_get(model, 'fields', {})).map((fieldKey, index) => {
      const field = _get(model, `fields.${fieldKey}`, {});
      const View = this.getView(field.type);
      return (
        <View
          key={index}
          hintText=""
          floatingLabelText={field.label}
          floatingLabelFixed={true}
          name={field.name}
          value={form[field.name]}
          onChange={this.handleChangeField.bind(this, field.name)}
        />
      );
    });
  }

  render() {

    return (
      <div className={b()}>
        <Title mods={{ size: 'h1' }}>
          Добавить данные
        </Title>

        <form className={b('form')}>
          {this.renderFields()}
        </form>

        <RaisedButton
          label="Сохранить"
          primary={true}
          onClick={this.handleSave}
        />
      </div>
    );
  }
}
