import React, { Component, PropTypes as Type } from 'react';
import './TableRow.styl';
import bemCn from 'bem-cn-fast';
const b = bemCn('table-row');


export default (props) => (
  <div className={b()}>
    {props.children}
  </div>
)
