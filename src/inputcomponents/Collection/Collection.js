import React, { Component, PropTypes as Type } from 'react';
import './Collection.styl';

import bemCn from 'bem-cn-fast';
const b = bemCn('collection');

export default class Collection extends Component {

  static propTypes = {
  }

  state = {
  };

  componentDidMount() {

  }

  render() {
    return (
      <div className={b()}>

      </div>
    );
  }
}
