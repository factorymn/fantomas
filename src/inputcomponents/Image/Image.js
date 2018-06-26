import React, { Component, PropTypes as Type } from 'react';
import './Image.styl';
import Dropzone from 'react-dropzone';


import bemCn from 'bem-cn-fast';
const b = bemCn('image');

export default class Image extends Component {

  static propTypes = {
  }

  state = {
  };

  componentDidMount() {

  }

  render() {
    const { label } = this.props;
    let dropzoneRef;
    return (
      <div className={b()}>
        <div className={b('label')}>{label}</div>
        <div className={b('body')}>

        </div>
      </div>
    );
  }
}
