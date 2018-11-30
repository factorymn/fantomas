// ModelNew
import React, { Component, PropTypes as Type } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModelActions } from 'actions';
import { Title } from 'components';
import './ModelNew.styl';
import * as tools from 'utils/tools.js';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import FieldsGroup from './FieldsGroup';
import Output from './Output';

import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _find from 'lodash/find';

import bemCn from 'bem-cn-fast';
const b = bemCn('model-new');
const loader = bemCn('loader');

@connect(state => ({
  model: state.modelReducer,
}), dispatch => ({
  modelActions: bindActionCreators(ModelActions, dispatch),
}))

export default class ModelNew extends Component {

  static propTypes = {
  }

  state = {
    id: '',
    parentId: '',
    childModels: {},
    name: '',
    api: {
      name: '',
      route: ''
    },
    fields: {},
    outputs: {},
    tab: 'input',
  }

  componentDidMount() {
    const modelID = _get(this.props, 'match.params.id');
    if (modelID) {
      const models = this.props.modelActions.getAll();
      models.then(() => {
        const model = _get(this.props, `model.models.${modelID}`);
        this.setState(model);
      });
    }
  }

  removeFromOutputs(outputs, id) {
    Object.keys(outputs).forEach((key) => {
      if (parseInt(outputs[key].fieldId, 10) === parseInt(id, 10)) {
        delete outputs[key];
      }
    })
  }

  handleUpdateField = (field) => {
    const fields = _cloneDeep(this.state.fields);
    console.log(fields, field);
    // fields[field.id] = field;
    // this.setState({ fields })
  }

  handleAddField = (field) => {
    const fields = _cloneDeep(this.state.fields);
    fields[Object.keys(fields).length] = field;
    this.setState({ fields })
  }

  handleRemoveField = (id) => {
    const fields = _cloneDeep(this.state.fields);
    const outputs = _cloneDeep(this.state.outputs);
    this.removeFromOutputs(outputs, id);
    delete fields[id];
    this.setState({ fields, outputs })
  }

  handleAddOutput = (output) => {
    const outputs = _cloneDeep(this.state.outputs);
    outputs[Object.keys(outputs).length] = output;
    this.setState({ outputs })
  }

  handleRemoveOutput = (id) => {
    const outputs = _cloneDeep(this.state.outputs);
    delete outputs[id];
    this.setState({ outputs })
  }

  handleSave = () => {
    const parentId = _get(this.props, 'match.params.parentId');
    const modelID = _get(this.props, 'match.params.id');
    let state = _cloneDeep(this.state);
    delete state.tab;
    let backPath = '';
    if (parentId) {
      state = Object.assign({}, state, { parentId: parseInt(parentId, 10) });
    }
    if (modelID) {
      this.props.modelActions.update(state, modelID);
      backPath = `/model/${modelID}`;
    } else {
      this.props.modelActions.add(state);
      backPath = `/`;
    }
    this.props.history.push(backPath);
  }

  handleRemove(modelID) {
    this.props.modelActions.remove(modelID);
  }

  handleChangeInput(id, e) {
    const state = _cloneDeep(this.state);
    _set(state, id, e.target.value);
    this.setState(state);
  };

  handleChangeTab = (tab) => {
    this.setState({
      tab,
    });
  }

  render() {
    const modelID = _get(this.props, 'match.params.id');
    const { name, api, fields, outputs } = this.state;

    return (
      <div className={b()}>
        <Title mods={{ size: 'h1' }}>
          Добавить модель
        </Title>
        <Tabs
          value={this.state.tab}
          onChange={this.handleChangeTab}
        >
          <Tab label="Запись" value="input">
            <div className={b('tab')}>
              <div className={b('section')}>
                <Title mods={{ size: 'h3' }}>Название</Title>
                <TextField
                  hintText="Введите название"
                  name='name'
                  value={name}
                  onChange={this.handleChangeInput.bind(this, 'name')}
                />
              </div>
              <div className={b('section')}>
                <Title mods={{ size: 'h3' }}>API</Title>
                <TextField
                  hintText=""
                  floatingLabelText="Имя модели"
                  floatingLabelFixed={true}
                  name='api[name]'
                  value={api.name}
                  onChange={this.handleChangeInput.bind(this, 'api.name')}
                />
                <br/>
                <TextField
                  hintText=""
                  floatingLabelText="Роут"
                  floatingLabelFixed={true}
                  name='api[route]'
                  value={api.route}
                  onChange={this.handleChangeInput.bind(this, 'api.route')}
                />
              </div>
              <div className={b('section')}>
                <FieldsGroup
                  models={_get(this.props, `model.models`, {})}
                  fields={fields}
                  onAdd={this.handleAddField}
                  onUpdate={this.handleUpdateField}
                  onRemove={this.handleRemoveField}
                />
              </div>
            </div>
          </Tab>
          <Tab label="Отображение" value="output">
            <div className={b('tab')}>
              <Output
                outputs={outputs}
                fields={fields}
                onAdd={this.handleAddOutput}
                onRemove={this.handleRemoveOutput}
              />
            </div>
          </Tab>
          <Tab label="Фильтры" value="filters">
          </Tab>
        </Tabs>

        <RaisedButton
          label="Сохранить"
          primary={true}
          onClick={this.handleSave}
        />
        {
          modelID && (
            <RaisedButton
              label="Удалить"
              secondary={true}
              onClick={this.handleRemove.bind(this, modelID)}
            />
          )
        }
      </div>
    );
  }
}
