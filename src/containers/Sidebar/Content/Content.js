// Page
import React, { Component, PropTypes as Type } from 'react';
import { Link } from 'react-router-dom';
import './Content.styl';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/content/create';
import _get from 'lodash/get';

import bemCn from 'bem-cn-fast';
const b = bemCn('content-links');

export default class Content extends Component {

  static propTypes = {
  }

  render() {
    const { models } = this.props;

    return (
      <div className={b()}>
        <div className={b('list')}>
          <Menu style={{ width: '100%' }}>
            {
              Object.keys(models).map((key, index) => {
                if (models[key].parentId) return;
                return (
                  <MenuItem
                    className={b('show-button')}
                    key={index}
                    containerElement={<Link to={`/model/${_get(models[key], 'id')}`} />}
                  >
                    <span className={b('show-button-text')}>{models[key].name}</span>
                    <div className={b('edit-button')}>
                      <IconButton
                        containerElement={
                          <Link
                            to={`/model/${_get(models[key], 'id')}/edit`}
                          />
                        }
                      >
                        <IconEdit />
                      </IconButton>
                    </div>
                  </MenuItem>
                )
              })
            }
          </Menu>
        </div>
        <div className={b('add')}>
          <FlatButton
            label="+ Модель"
            primary={true}
            containerElement={<Link to={'/model/new'} />}
          />
        </div>
      </div>
    );
  }
}
