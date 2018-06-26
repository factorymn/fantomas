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
import _forEach from 'lodash/forEach';


import bemCn from 'bem-cn-fast';
const b = bemCn('data-edit');
const loader = bemCn('loader');

@connect(state => ({
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
    isCreate: true,
    modelData: {},
    modelDataId: null,
    form: {}
  }

  componentDidMount() {
    console.log(this.props);
    const modelID = _get(this.props, 'match.params.modelId');
    const modelDataId = _get(this.props, 'match.params.id');
    const models = this.props.modelActions.getAll();
    models.then(() => {
      const model = _get(this.props, `model.models.${modelID}`);
      this.props.dataActions.getOne(model, modelDataId).then((data) => {
        this.setValues(model, data);
      });
      this.setState({ model, isCreate: !modelDataId, modelDataId });
    });
  }

  handleSave = () => {
    const { model, form, isCreate, modelDataId } = this.state;
    const createOrUpdate = isCreate ? this.props.dataActions.create : this.props.dataActions.update;
    createOrUpdate(model, form, modelDataId);
    const backPath = `/model/${model.id}`;
    this.props.history.push(backPath);
  }

  handleChangeField = (name, e, data) => {
    const form = _cloneDeep(this.state.form);
    // form[name] = data || e;
    form[name] = data;
    this.setState({ form });
  }

  setValues(model, data) {
    const formData = {};
    _forEach(_get(model, 'fields', {}), (value, key) => {
      formData[value.name] = _get(data, value.name);
    });
    this.setState({ form: formData });
  }

  getView(inputTypeId) {
    let View = _get(_find(inputComponents, { name: inputTypeId }), 'component') || TextField;
    return View;
  }

  renderFields() {
    const { model, form } = this.state;
    const models = _get(this.props, 'model.models');
    return Object.keys(_get(model, 'fields', {})).map((fieldKey, index) => {
      const field = _get(model, `fields.${fieldKey}`, {});
      const View = this.getView(field.type);
      return (
        <div className={b('field-wrap')}>
          <View
            key={index}
            hintText=""
            floatingLabelText={field.label}
            floatingLabelFixed={true}
            name={field.name}
            value={form[field.name]}
            onChange={this.handleChangeField.bind(this, field.name)}
            models={models}
            dataActions={this.props.dataActions}
            {...field}
          />
        </div>
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
