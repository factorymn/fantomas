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
    items: []
  };

  componentDidMount() {
    const { dataActions, models, params, value } = this.props;
    if (!params) return;
    dataActions.getAll(models[params.modelId]).then((data) => {
      this.setState({ items: data, value });
    });
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.onChange(value);
  }

  render() {
    const { floatingLabelText, models } = this.props;
    const { items } = this.state;
    return (
      <div className={b()}>
        <SelectField
          floatingLabelText={floatingLabelText}
          value={this.state.value}
          onChange={this.handleChange}
        >
          {
            items.map((item, key) => (
              <MenuItem
                key={key}
                value={item.id}
                primaryText={item.name || item.title}
              />
            ))
          }
        </SelectField>
      </div>
    );
  }
}
