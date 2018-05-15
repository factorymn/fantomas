import React, { Component, PropTypes as Type } from 'react';
import './Title.styl';

import bemCn from 'bem-cn-fast';
const b = bemCn('title');

export default ({ children, mods }) => (
  <div className={b(mods)}>
    {children}
  </div>
);
