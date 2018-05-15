import React, { Component, PropTypes as Type } from 'react';
import './Select.styl';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import bemCn from 'bem-cn-fast';
const b = bemCn('select');

export default class Select extends Component {

  static propTypes = {
  }

  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className={b()}>
        <SelectField
          floatingLabelText="Frequency"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
      </div>
    );
  }
}
