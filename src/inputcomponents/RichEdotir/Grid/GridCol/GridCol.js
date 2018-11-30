import React, { Component, PropTypes as Type } from 'react';
import './GridCol.styl';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconRemove from 'material-ui/svg-icons/content/clear';
import Slider from 'material-ui/Slider';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _forIn from 'lodash/forIn';
import _cloneDeep from 'lodash/cloneDeep';
import { richEditorComponents } from '../../richEditorComponents';

import bemCn from 'bem-cn-fast';
const b = bemCn('grid-col');

export default class GridCol extends Component {

  static propTypes = {
  }

  state = {
    slider: Math.pow(10, 4),
    // width: _get(this.props, 'block.params.width', 1)
  };

  handleSlider = (event, value) => {

    const { block } = this.props;
    const colBlock = _cloneDeep(block);
    colBlock.params = {
      width: value
    };
    this.props.onUpdate(colBlock, null, 'update');
    // this.setState({ width: value});
  };


  componentDidMount() {
  }

  addCol = () => {
  }


  addComponent = () => {
    const { block } = this.props;
    this.props.onUpdate(block, null, 'chose');
  }

  getComponent = (block) => {
    const Component = _get(_find(richEditorComponents, { name: block.block }), 'component') || <div/>;
    return Component;
  }


  getBlocks = () => {
    const { block, blocks } = this.props;
    const _blocks = [];

    _forIn(block.childBlocks, (item, key) => {
      _blocks.push(blocks[key])
    })

    return _blocks;
  }


  onRemoveBlock = (block) => {
    this.props.onUpdate(block, null, 'remove');
  }

  renderContent = () => {
    const content = this.getBlocks();
    return (content || []).map((block, index) => {
      const Component = this.getComponent(block)
      return (
        <div
          key={index}
          className={b('block')}
        >
          <Component
            onChange={this.props.onChangeNoBind.bind(this, block)}
            value={block.content}
          />
          <div className={b('block-controls')}>
          <IconButton
            onClick={this.onRemoveBlock.bind(this, block)}
          >
            <IconRemove />
          </IconButton>
        </div>
        </div>
      )
    });
  }

  render() {
    const width = _get(this.props, 'block.params.width');
    return (
      <div className={b()}>
        <div className={b('width')}>
          { `${width}/12` }
        </div>
        <Slider
          className={b('slider')}
          min={1}
          max={12}
          step={1}
          value={width}
          onChange={this.handleSlider}
        />
        { this.renderContent() }
        <FlatButton
          className={b('add-button')}
          label="+"
          secondary={true}
          onClick={this.addComponent}
        />
      </div>
    );
  }
}
