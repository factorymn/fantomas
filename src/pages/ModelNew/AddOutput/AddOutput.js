// Page
import React, { Component, PropTypes as Type } from 'react';
// import { Link } from 'react-router-dom';
import './AddOutput.styl';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { OutputDataTypes, Title } from 'components';
import { outputCmponents } from 'outputcomponents';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';

import bemCn from 'bem-cn-fast';
const b = bemCn('add-output');

export default class AddOutput extends Component {

  static propTypes = {
  }

  onChange(type, e, data) {
    this.props.onChange(type, data || e);
  }

  render() {
    const { fields } = this.props;
    return (
      <div className={b()}>
        <div className={b('item')}>
          <Title mods={{ size: 'h3' }}>Поля</Title>
          <RadioButtonGroup
            name="fields"
            onChange={this.onChange.bind(this, 'fieldId')}
          >
            {
            Object.keys(fields).map((key, index) => (
              <RadioButton
                key={index}
                value={key}
                label={fields[key].label}
              />
              ))
            }
          </RadioButtonGroup>
        </div>
        <div className={b('item')}>
          <Title mods={{ size: 'h3' }}>Компонент отображения</Title>
          <OutputDataTypes
            types={outputCmponents}
            onChange={this.onChange.bind(this, 'typeId')}
          />
          </div>
      </div>
    );
  }
}
