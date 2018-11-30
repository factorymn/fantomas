import React, { Component, PropTypes as Type } from 'react';
import './Grid.styl';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconRemove from 'material-ui/svg-icons/content/clear';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _random from 'lodash/random';
import _forIn from 'lodash/forIn';
import GridCol from './GridCol/GridCol';

import bemCn from 'bem-cn-fast';
const b = bemCn('grid');

export default class Grid extends Component {

  static propTypes = {
  }

  state = {
    columns: []
  };


  componentDidMount() {
  }

  addCol = () => {
    const block = this.props.block;
    const _index = Date.now() + _random(10, 90);
    const column = {
      id: _index,
      block: 'grid-col',
      params: { width: 1 },
      childBlocks: {},
      parentBlockId: block.id,
      content: []
    };
    this.props.onUpdate(block, column, 'add');

  }

  onChangeGridCol = () => {
    this.props.onUpdate(column, 'add');
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
    const { blocks } = this.props;
    const content = this.getBlocks();
    return content.map((block, index) => (
      <div
        key={index}
        className={b('col', { size: _get(block, 'params.width', 1) })}
      >
        <GridCol
          block={block}
          blocks={blocks}
          content={block.content}
          onChange={this.props.onChange}
          onChangeNoBind={this.props.onChangeNoBind}
          onUpdate={this.props.onUpdate}
        />
        <div className={b('controls')}>
          <IconButton
            onClick={this.onRemoveBlock.bind(this, block)}
          >
            <IconRemove />
          </IconButton>
        </div>
      </div>
    ));
  }

  render() {
    // const { content } = this.props;
    return (
      <div className={b()}>
        <div className={b('colums')}>
          { this.renderContent() }
        </div>

        <IconButton
          secondary={true}
          onClick={this.addCol}
          mini={true}
        >
          <IconAdd />
        </IconButton>
      </div>
    );
  }
}
