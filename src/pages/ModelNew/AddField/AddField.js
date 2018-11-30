// Page
import React, { Component, PropTypes as Type } from 'react';
// import { Link } from 'react-router-dom';
import './AddField.styl';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { DataTypes } from 'components';
import { inputComponents } from 'inputcomponents';
import { paramsComponents } from 'paramsComponents';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import _forIn from 'lodash/forIn';
import _isArray from 'lodash/isArray';
import _find from 'lodash/find';
import _get from 'lodash/get';

import bemCn from 'bem-cn-fast';
const b = bemCn('add-field');

export default class AddField extends Component {

  static propTypes = {
  }

  state = {
    showModelsParams: false,
    modelType: null,
    label: _get(this.props, 'field.label', ''),
    name: _get(this.props, 'field.name', ''),
    type: _get(this.props, 'field.type', ''),
  }

  onChange(type, e, data) {
    const _data = data || e;
    this.props.onChange(type, _data);
    if (type === 'type') {
      this.setState({ showModelsParams: true, modelType: _data });
    }
    this.setState({ [type]: _data });
  }

  onParamsChange(modelType, data) {
    this.props.onChange('params', data);
  }

  renderParams() {
    const { modelType } = this.state;
    const { models } = this.props;
    const component = _find(paramsComponents, { name: modelType });
    if (!component) return null;
    const ParamsComponent = _get(component, 'component');
    return (
      <ParamsComponent
        onChange={this.onParamsChange.bind(this, modelType)}
        models={models}
      />
    );
  }

  render() {
    const { models, field } = this.props;
    const { showModelsParams, label, name } = this.state;

    return (
      <div className={b()}>
        <div className={b('col')}>
          <TextField
            hintText=""
            floatingLabelText="Название поля"
            floatingLabelFixed={true}
            onChange={this.onChange.bind(this, 'label')}
            value={label}
          />
          <br/>
          <TextField
            hintText=""
            floatingLabelText="Имя поля в данных"
            floatingLabelFixed={true}
            onChange={this.onChange.bind(this, 'name')}
            value={name}
          />
          <DataTypes
            types={inputComponents}
            onChange={this.onChange.bind(this, 'type')}
            value={field.type}
          />
        </div>
        <div className={b('col')}>
          {
            showModelsParams && this.renderParams()
          }
        </div>
      </div>
    );
  }
}
