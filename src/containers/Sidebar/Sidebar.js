// Page
import React, { Component, PropTypes as Type } from 'react';
import './Sidebar.styl';

import Content from './Content';
import Other from './Other';

import bemCn from 'bem-cn-fast';
const b = bemCn('sidebar');

export default class Sidebar extends Component {

  static propTypes = {
  }

  render() {
    const { models } = this.props;
    return (
      <div className={b()}>
        <div className={b('section')}>
          <div className={b('title')}>Модели</div>
          <Content models={models}/>
        </div>
        <div className={b('section')}>
          <div className={b('title')}>Настройки</div>
          <Other />
        </div>
      </div>
    );
  }
}
