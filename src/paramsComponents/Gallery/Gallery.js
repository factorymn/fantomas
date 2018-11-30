import React, { Component, PropTypes as Type } from 'react';
import './Gallery.styl';
import TextField from 'material-ui/TextField';
import _cloneDeep from 'lodash/cloneDeep';

import bemCn from 'bem-cn-fast';
const b = bemCn('gallery');

export default class Gallery extends Component {

  static propTypes = {
  }

  state = {
    uploadUrl: '',
    name: '',
  };

  onChange = (type, e, value) => {
    this.setState({ [type]: value });
    const state = _cloneDeep(this.state);
    state[type] = value;
    this.props.onChange(state);
  }

  render() {
    const { label } = this.props;
    const { uploadUrl, name } = this.state;
    return (
      <div className={b()}>
        <div className={b('label')}>Параметры загрузки изображения:</div>
        <TextField
          hintText=""
          floatingLabelText="url загрузки изображения"
          floatingLabelFixed={true}
          value={uploadUrl}
          onChange={this.onChange.bind(this, 'uploadUrl')}
        />
        <TextField
          hintText=""
          floatingLabelText="Имя поля в котором вернется изображение"
          floatingLabelFixed={true}
          value={name}
          onChange={this.onChange.bind(this, 'name')}
        />
      </div>
    );
  }
}
