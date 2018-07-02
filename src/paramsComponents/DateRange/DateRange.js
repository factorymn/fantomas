import React, { Component, PropTypes as Type } from 'react';
import './DateRange.styl';

import bemCn from 'bem-cn-fast';
const b = bemCn('date-range-params');

export default class DateRange extends Component {

  static propTypes = {
  }

  state = {
  };

  render() {
    const { label } = this.props;
    const { uploadUrl, name } = this.state;
    return (
      <div className={b()}>
        <div className={b('label')}>В ваше поле будут записанны значения:</div>
        <ul>
          <li>from: Date start</li>
          <li>to: Date end</li>
        </ul>
      </div>
    );
  }
}
