// Page
import React, { Component, PropTypes as Type } from 'react';
import { Link } from 'react-router-dom';
import './Categories.styl';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/content/create';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconFolder from 'material-ui/svg-icons/file/folder-open';
import { colors } from 'material-ui/styles';
import IconCreateFolder from 'material-ui/svg-icons/file/create-new-folder';
import { Title, Table } from 'components';
const { TableHead, TableRow, TableCol } = Table;
import _get from 'lodash/get';

import bemCn from 'bem-cn-fast';
const b = bemCn('categories');

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
    fill: colors.blueA200
  },
  small: {
    width: 36,
    height: 36,
    padding: 0,
  }
};



export default class Categories extends Component {

  static propTypes = {
  }

  handleRemove(modelID) {
    this.props.onRemove(modelID);
  }

  render() {
    const { modelID, childModels } = this.props;

    return (
      <div className={b()}>
        <Title mods={{ size: 'h2' }}>
          <span>Модели</span>
          <IconButton
            iconStyle={styles.smallIcon}
            style={styles.small}
            containerElement={<Link to={`/model/${modelID}/category/new`} />}
          >
            <IconCreateFolder />
        </IconButton>
        </Title>
        <Table>
          {
            childModels.map((model, index) => (
              <TableRow key={index}>
                <TableCol>
                  <Link className={b('link')} to={`/model/${_get(model, 'id')}`}>
                    <IconFolder />
                    <span>{_get(model, 'name')}</span>
                  </Link>
                </TableCol>
                <TableCol>
                  <div className={b('controls')}>
                    <IconButton
                      containerElement={
                        <Link
                          to={`/model/${_get(model, 'parentId')}/category/${_get(model, 'id')}/edit`}
                        />
                      }
                    >
                      <IconEdit />
                    </IconButton>
                    <IconButton
                      onClick={this.handleRemove.bind(this, _get(model, 'id'))}
                    >
                      <IconDelete />
                    </IconButton>
                  </div>
                </TableCol>
              </TableRow>
            ))
          }
        </Table>
      </div>
    );
  }
}
