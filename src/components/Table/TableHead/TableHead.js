import React, { Component, PropTypes as Type } from 'react';
import './TableHead.styl';
import bemCn from 'bem-cn-fast';
const b = bemCn('table-head');


export default (props) => (
  <div className={b()}>
    {props.children}
  </div>
)
