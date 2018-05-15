import React, { Component, PropTypes as Type } from 'react';
import './TableCol.styl';
import bemCn from 'bem-cn-fast';
const b = bemCn('table-col');


export default (props) => (
  <div className={b()}>
    {props.children}
  </div>
)
