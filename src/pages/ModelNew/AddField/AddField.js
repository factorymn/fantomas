// Page
import React, { Component, PropTypes as Type } from 'react';
// import { Link } from 'react-router-dom';
import './AddField.styl';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { DataTypes } from 'components';
import { inputComponents } from 'inputcomponents';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import _forIn from 'lodash/forIn';
import _isArray from 'lodash/isArray';

import bemCn from 'bem-cn-fast';
const b = bemCn('add-field');

export default class AddField extends Component {

  static propTypes = {
  }

  state = {
    showSelectModels: false
  }

  onChange(type, e, data) {
    this.props.onChange(type, data || e);
    if (type === 'type') {
      const showSelectModels = (data || e) === 'select';
      this.setState({ showSelectModels });
    }
  }

  pushQueue(models, generalModels, arr) {
    if (_isArray(generalModels)) {
      generalModels.forEach((item) => {
        arr.push(item);
        if (!Object.keys(item.childModels).length) return;
        Object.keys(item.childModels).forEach((key) => {
          console.log(models[key]);
          if(!models[key]) return;
          this.pushQueue(models, models[key], arr);
        })
      })
    } else {
      arr.push(generalModels);
      if (!Object.keys(generalModels.childModels).length) return;
      Object.keys(generalModels.childModels).forEach((key) => {
        if(!models[key]) return;
        this.pushQueue(models, models[key], arr);
      })
    }
  }

  queue(models) {
    const generalModels = [];
    const queueModels = [];
    _forIn(models, (model, index) => {
      if (model.parentId) return;
      generalModels.push(model);
    });

    this.pushQueue(models, generalModels, queueModels);
    return queueModels;
  }

  renderModels(models) {
    const marginLeft = 10;
    const queueModels = this.queue(models);
    return queueModels.map((item, index) => (
        <RadioButton
          key={index}
          className={b('radio')}
          style={{ marginLeft: item.parentId ? marginLeft + 10 : 0 }}
          value={item.id}
          label={item.name}
        />
      )
    );
  }

  render() {
    const { models } = this.props;
    const { showSelectModels } = this.state;
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
            showSelectModels && (
              <RadioButtonGroup
                onChange={this.onChange.bind(this, 'modelId')}
                name="select"
              >
                {
                  this.renderModels(models)
                }
              </RadioButtonGroup>
            )
          }
        </div>
      </div>
    );
  }
}
