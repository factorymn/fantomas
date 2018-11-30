import React, { Component, PropTypes as Type } from 'react';
import './RichEdotir.styl';
import CircularProgress from 'material-ui/CircularProgress';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _random from 'lodash/random';
import _forIn from 'lodash/forIn';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconRemove from 'material-ui/svg-icons/content/clear';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { richEditorComponents } from './richEditorComponents';


import bemCn from 'bem-cn-fast';
const b = bemCn('rich-edotir');

export default class RichEdotir extends Component {

  static propTypes = {
  }

  state = {
    openDrawer: false,
    blocks: JSON.parse(this.props.value) || {},
    activeBlockId: null,
  };

  handleToggle = () => this.setState({ openDrawer: !this.state.openDrawer });

  onChangeContent = (block, value) => {
    const blocks = _cloneDeep(this.state.blocks);
    const _block = blocks[block.id];
    _block.content = value;
    this.setState({ blocks });
    this.props.onChange(JSON.stringify(blocks));
  }

  removeChildBlocks = (block, blocks) => {
    if (!block.childBlocks) return;
    _forIn(block.childBlocks, (blockName, blockId) => {
      this.removeChildBlocks(blocks[blockId], blocks);
      delete blocks[blockId];
    })
  }

  onChangeBlock = (block, params, action) => {
    // refactor _clonedeep if need
    let blocks = _cloneDeep(this.state.blocks);
    if (action === 'chose') {
      this.setState({ openDrawer: true, activeBlockId: block.id });
      // return;
    }

    if (action === 'add') {
      let blockState = blocks[block.id];
      // const blockState = _find(blocks, { id: block.id });
      if (!blockState) return console.log('BLOCK NOT FIND');

      blockState.childBlocks[params.id] = params.block;
      blocks[params.id] = params;

      this.setState({ blocks });
      // return;
    }

    if (action === 'update') {
      if (!blocks[block.id]) return console.log('BLOCK NOT FIND');
      blocks[block.id] = _cloneDeep(block);

      this.setState({ blocks });
      // return;
    }

    if (action === 'remove') {
      if (!blocks[block.id]) return console.log('BLOCK NOT FIND');
      if (block.parentBlockId) {
        if (_get(blocks, `${block.parentBlockId}.childBlocks.${block.id}`)) {
          delete blocks[block.parentBlockId].childBlocks[block.id]
        }
      }
      this.removeChildBlocks(block, blocks);
      delete blocks[block.id];

      this.setState({ blocks });
    }
    this.props.onChange(JSON.stringify(blocks));
  }

  onRemoveBlock = (block) => {
    this.onChangeBlock(block, null, 'remove');
  }

  onClickMenuItem = (block) => {
    const { activeBlockId } = this.state;
    const blocks = _cloneDeep(this.state.blocks);
    const newBlockIndex = Object.keys(blocks).length;
    const _index = Date.now() + _random(10, 90);

    blocks[_index] = {
      id: _index,
      _id: newBlockIndex,
      block: block.name,
      order: newBlockIndex,
      childBlocks: {},
      parentBlockId: null,
      content: []
    }

    if (activeBlockId) {
      const _block = blocks[activeBlockId];
      _block.childBlocks[_index] = block.name;

      blocks[_index].parentBlockId = activeBlockId;
    }

    this.setState({
      openDrawer: false,
      blocks,
      activeBlockId: null
    });

    this.props.onChange(JSON.stringify(blocks));
  };

  getOnlyParentsBlocks = () => {
    const { blocks } = this.state;
    const _blocks = [];
    _forIn(blocks, (block) => {
      if (block.parentBlockId) return;
      _blocks.push(_cloneDeep(block))
    })
    return _blocks;
  }

  renderBlocks = () => {
    const blocks = this.getOnlyParentsBlocks();
    return blocks.map((block, index) => {
      const Component = _get(_find(richEditorComponents, { name: block.block }), 'component') || <div/>;

      return (
        <div
          key={index}
          className={b('block')}
        >
          <Component
            index={index}
            blocks={this.state.blocks}
            block={block}
            onUpdate={this.onChangeBlock.bind(this)}
            onChange={this.onChangeContent.bind(this, block)}
            onChangeNoBind={this.onChangeContent}
            value={block.content}
          />
          <div className={b('controls')}>
            <IconButton
              onClick={this.onRemoveBlock.bind(this, block)}
            >
              <IconRemove />
            </IconButton>
          </div>
        </div>
      )
    })
  }

  rederRichEditorComponents = () => {
    return richEditorComponents.map((block, key) => (
      <MenuItem
        key={key}
        onClick={this.onClickMenuItem.bind(this, block)}
      >
        {block.label}
      </MenuItem>
    ));
  };

  render() {
    const { label } = this.props;
    // console.log('state', this.state);
    return (
      <div className={b()}>
        <div className={b('label')}>
          Редактор блоков
        </div>
        <div className={b('reder-block')}>
          { this.renderBlocks() }
        </div>
        <FloatingActionButton
          className={b('add-block-button')}
          mini={true}
          onClick={this.handleToggle}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Drawer open={this.state.openDrawer}>
          <h5>Компоненты</h5>
          {
            this.rederRichEditorComponents()
          }
          <h5>Мои шаблоны</h5>
        </Drawer>
      </div>
    );
  }
}
