import React, { Component, PropTypes as Type } from 'react';
import './Text.styl';
import bemCn from 'bem-cn-fast';
const b = bemCn('output-text');


export default (props) => (
  <div className={b()}>
    {props.value}
  </div>
)
