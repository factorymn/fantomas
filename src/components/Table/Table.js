import React, { Component, PropTypes as Type } from 'react';
import './Table.styl';
import bemCn from 'bem-cn-fast';
const b = bemCn('table');


export default class Table extends Component {

  static propTypes = {
  }

  render() {
    return (
      <div className={b()}>
        {this.props.children}
      </div>
    );
  }
}
