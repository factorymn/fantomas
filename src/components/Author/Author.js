// Author
import React, { Component, PropTypes as Type } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import './Author.styl';

import bemCn from 'bem-cn-fast';
const b = bemCn('author');

export default class Author extends Component {

  static propTypes = {
    data: Type.object,
    controls: Type.object
  }

  render() {
    const { name } = this.props.data;
    const { controls } = this.props;

    return (
      <div className={b()}>
        <Card>
          <CardHeader
            title={name}
            subtitle=""
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardText expandable={true}>
            ""
          </CardText>
          <CardActions>
            {controls}
          </CardActions>
        </Card>
      </div>
    );
  }
}
