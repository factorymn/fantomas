// Output
import React, { Component, PropTypes as Type } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModelActions } from 'actions';
import './Output.styl';
import * as tools from 'utils/tools.js';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AddOutput from '../AddOutput';

import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import _get from 'lodash/get';


import bemCn from 'bem-cn-fast';
const b = bemCn('output');
const loader = bemCn('loader');


export default class Output extends Component {

  static propTypes = {
  }

  state = {
    open: false,
    label: '',
    fieldId: '',
    typeId: 1
  };

  handleModalOpen = () => {
    this.setState({open: true});
  };

  handleModalClose = () => {
    this.setState({open: false});
  };

  handleModalSave = () => {
    const { fieldId, label, typeId } = this.state;
    const { fields } = this.props;
    this.props.onAdd({ fieldId, label, typeId });
    this.setState({
      open: false,
      fieldId: '',
      label: '',
      typeId: 1
    });
  };

  handleRemoveOutput = (id) => {
    this.props.onRemove(id);
  }

  onChange = (type, data) => {
    this.setState({ [type]: data })
  };

  render() {
    const { outputs, fields } = this.props;
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
        <div className={b('list')}>
          {
            Object.keys(outputs).map((key, index) => (
              <div key={index} className={b('list-item')}>
                <div className={b('list-item-id')}>
                  {outputs[key].fieldId}
                </div>
                <div className={b('list-item-name')}>
                  {fields[outputs[key].fieldId].label}
                </div>
                <div className={b('list-item-type')}>
                  {outputs[key].typeId}
                </div>
                <div>
                  <FlatButton
                    label="-"
                    secondary={true}
                    onClick={this.handleRemoveOutput.bind(this, key)}
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div className={b('controls')}>
          {/*<RaisedButton
            label="+ Группа"
            secondary={true}
            onClick={this.handleAddGroup}
          />*/}
          <FlatButton
            label="+ Поле"
            primary={true}
            onClick={this.handleModalOpen}
          />
        </div>
        <Dialog
          title="Добавить вывод"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleModalClose}
        >
          <AddOutput
            fields={fields}
            onChange={this.onChange}
          />
        </Dialog>
      </div>
    );
  }
}
