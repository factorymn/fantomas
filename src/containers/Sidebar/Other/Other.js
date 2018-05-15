// Page
import React, { Component, PropTypes as Type } from 'react';
import { Link } from 'react-router-dom';
import './Other.styl';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import bemCn from 'bem-cn-fast';
const b = bemCn('other-links');

const links = [
  {
    link: '/fantomas/users',
    title: 'Пользователи'
  },
  {
    link: '/fantomas/types',
    title: 'Типы данных'
  },
];

export default class Other extends Component {

  static propTypes = {
  }

  render() {
    return (
      <div className={b()}>
        <Menu style={{ width: '100%' }}>
          {
            links.map((item, index) => (
              <MenuItem
                key={index}
                containerElement={<Link to={item.link} />}
              >{item.title}</MenuItem>
            ))
          }
        </Menu>
      </div>
    );
  }
}
