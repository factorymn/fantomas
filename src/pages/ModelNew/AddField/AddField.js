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
    modelType: null
  }

  onChange(type, e, data) {
    this.props.onChange(type, data || e);
    if (type === 'type') {
      this.setState({ showModelsParams: true, modelType: (data || e) });
    }
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
    const { models } = this.props;
    const { showModelsParams } = this.state;
    return (
      <div className={b()}>
        <div className={b('col')}>
          <TextField
            hintText=""
            floatingLabelText="Название поля"
            floatingLabelFixed={true}
            onChange={this.onChange.bind(this, 'label')}
          />
          <br/>
          <TextField
            hintText=""
            floatingLabelText="Имя поля в данных"
            floatingLabelFixed={true}
            onChange={this.onChange.bind(this, 'name')}
          />
          <DataTypes
            types={inputComponents}
            onChange={this.onChange.bind(this, 'type')}
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
