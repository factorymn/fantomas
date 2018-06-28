import React, { Component, PropTypes as Type } from 'react';
import './Select.styl';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import _forIn from 'lodash/forIn';
import _isArray from 'lodash/isArray';

import bemCn from 'bem-cn-fast';
const b = bemCn('select');

export default class Select extends Component {

  static propTypes = {
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

  onChange = (e, value) => {
    this.props.onChange({ modelId: value });
  }

  render() {
    const { models } = this.props;
    return (
      <div className={b()}>
        <div className={b('label')}>Параметры загрузки изображения:</div>
        <RadioButtonGroup
          onChange={this.onChange}
          name="select"
        >
          {
            this.renderModels(models)
          }
        </RadioButtonGroup>
      </div>
    );
  }
}
