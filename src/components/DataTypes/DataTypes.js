import React, { Component, PropTypes as Type } from 'react';
import './DataTypes.styl';
// import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import bemCn from 'bem-cn-fast';
const b = bemCn('data-types');

export default class DataTypes extends Component {

  static propTypes = {
  }

  onChangeDataType(e, data) {
    this.props.onChange(data);
  }

  render() {
    const { types, value } = this.props;
    return (
      <div className={b()}>
        <RadioButtonGroup
          name="datatypes"
          defaultSelected={value || types[0].name}
          onChange={this.onChangeDataType.bind(this)}
        >
          {
            types.map((type, key) => (
              <RadioButton
                key={key}
                value={type.name}
                label={type.name}
              />
            ))
          }
        </RadioButtonGroup>

      </div>
    );
  }
}
