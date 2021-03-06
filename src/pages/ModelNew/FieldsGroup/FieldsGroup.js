// Page
import React, { Component, PropTypes as Type } from 'react';
// import { Link } from 'react-router-dom';
import './FieldsGroup.styl';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add-box';
import IconEdit from 'material-ui/svg-icons/content/create';
import IconDelete from 'material-ui/svg-icons/action/delete';
import AddField from '../AddField';
import { Title } from 'components';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import { colors } from 'material-ui/styles';

// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';

import bemCn from 'bem-cn-fast';
const b = bemCn('fields-group');

const styles = {
  smallIcon: {
    width: 34,
    height: 35,
    fill: colors.blueA200
  },
  small: {
    width: 35,
    height: 35,
    padding: 0,
  }
};


export default class FieldsGroup extends Component {

  static propTypes = {
  }

  state = {
    open: false,
    label: '',
    name: '',
    params: {},
    type: 'string',
    activeFieldId: null
  };

  handleModalOpen = () => {
    this.setState({open: true});
  };

  handleModalClose = () => {
    this.setState({
      open: false,
      name: '',
      label: '',
      params: {},
      type: 'string',
      activeFieldId: null
    });
  };

  handleModalSave = () => {
    const { name, label, type, params, activeFieldId } = this.state;
    if (activeFieldId) {
      this.props.onUpdate({ name, label, type, params, id: activeFieldId });
    } else {
      this.props.onAdd({ name, label, type, params, activeFieldId });
    }
    this.setState({
      open: false,
      name: '',
      label: '',
      params: {},
      type: 'string',
      activeFieldId: null
    });
  };

  handleRemoveField = (id) => {
    this.props.onRemove(id);
  }

  handleUpdateField = (activeFieldId) => {
    const field = _get(this.props, `fields.${activeFieldId}`);
    const {
      name,
      label,
      params,
      type
    } = field;
    this.setState({
      open: true,
      activeFieldId,
      name,
      label,
      params,
      type,
    });
  }

  onChange = (type, data) => {
    this.setState({ [type]: data })
  };

  render() {
    const { activeFieldId } = this.state;
    const { fields, models } = this.props;
    const actions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onClick={this.handleModalClose}
      />,
      <FlatButton
        label="Сохранить"
        primary={true}
        onClick={this.handleModalSave}
      />,
    ];

    return (
      <div className={b()}>
        <Title mods={{ size: 'h3' }}>
          <span>Поля</span>
          <IconButton
            iconStyle={styles.smallIcon}
            style={styles.small}
            onClick={this.handleModalOpen}
          >
            <IconAdd />
          </IconButton>
        </Title>
        <div className={b('list')}>
          {
            Object.keys(fields).map((key, index) => (
              <div key={index} className={b('list-item')}>
                <div className={b('list-item-label')}>
                  {fields[key].label}
                </div>
                <div className={b('list-item-name')}>
                  {fields[key].name}
                </div>
                <div className={b('list-item-type')}>
                  {fields[key].type}
                </div>
                <div>
                <IconButton
                  onClick={this.handleUpdateField.bind(this, key)}
                >
                  <IconEdit />
                </IconButton>
                  <IconButton
                    onClick={this.handleRemoveField.bind(this, key)}
                  >
                    <IconDelete />
                  </IconButton>
                </div>
              </div>
            ))
          }
        </div>
        <Dialog
          title="Создание поля"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleModalClose}
        >
          <AddField
            models={models}
            field={_get(fields, activeFieldId, {})}
            onChange={this.onChange}
          />
        </Dialog>
      </div>
    );
  }
}
