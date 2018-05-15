import React, { Component, PropTypes as Type } from 'react';
import './OutputDataTypes.styl';
// import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import bemCn from 'bem-cn-fast';
const b = bemCn('output-data-types');

export default class OutputDataTypes extends Component {

  static propTypes = {
  }

  onChangeDataType(e, data) {
    this.props.onChange(data);
  }

  render() {
    const { types } = this.props;
    return (
      <div className={b()}>
        <RadioButtonGroup
          name="datatypes"
          defaultSelected={types[0].id}
          onChange={this.onChangeDataType.bind(this)}
        >
          {
            types.map((type, key) => (
              <RadioButton
                key={key}
                value={type.id}
                label={type.name}
              />
            ))
          }
        </RadioButtonGroup>

      </div>
    );
  }
}
