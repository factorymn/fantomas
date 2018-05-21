// ModelNew
import React, { Component, PropTypes as Type } from 'react';
import { Link } from 'react-router-dom';
import './ModelItems.styl';
import { Title, Table } from 'components';
const { TableHead, TableRow, TableCol } = Table;
import { outputCmponents } from 'outputcomponents';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/content/create';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconFolder from 'material-ui/svg-icons/file/folder-open';
import Text from 'outputcomponents/Text/Text';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _forIn from 'lodash/forIn';

import bemCn from 'bem-cn-fast';
const b = bemCn('model-items');
const loader = bemCn('loader');

export default class ModelItems extends Component {

  static propTypes = {
  }

  state = {
  }


  handleRemove = (id) => {
    const { model } = this.props;
    this.props.onRemove(model, id);
  }

  renderHead(outputs, fields) {
    const head = [];
    _forIn(outputs, (value, key) => {
      const field = _get(fields, value.fieldId, {});
      head.push(<TableCol key={key}>{field.label}</TableCol>);
    });
    return head;
  }

  renderCol(outputs, fields, modelItemData) {
    const col = [];
    _forIn(outputs, (output, key) => {
      const outputType = output.typeId;
      const field = _get(fields, output.fieldId);
      const value = _get(modelItemData , field.name);
      const View = this.getView(outputType);
      col.push(<TableCol key={key}><View value={value}/></TableCol>);
    });
    return col;
  }

  getView(outputTypeId) {
    let View = _get(_find(outputCmponents, { id: outputTypeId }), 'component') || Text;
    return View;
  }

  renderBody(modelId, outputs, fields, modelData) {
    if (!modelData.length) return (

      <div className={b('no-data')}>
        Данных нет
      </div>
    );
    return modelData.map((item, key) => {
      return (
        <TableRow key={key}>
          {
            this.renderCol(outputs, fields, item)
          }
          <TableCol>
            <div className={b('controls')}>
              <IconButton
                containerElement={
                  <Link
                    to={`/model/${modelId}/data/${item.id}/edit`}
                  />
                }
              >
                <IconEdit />
              </IconButton>
              <IconButton
              >
                <IconDelete
                  onClick={this.handleRemove.bind(this, item.id)}
                />
              </IconButton>
            </div>
          </TableCol>
        </TableRow>
      )
    })
  }

  render() {
    const { model, modelData } = this.props;
    if (!Object.keys(_get(model, 'outputs', {})).length) return (null);

    return (
      <div className={b()}>
        { /* <Title mods={{ size: 'h2' }}>Вывод</Title> */ }
        <Table>
          <TableHead>
            { this.renderHead(model.outputs, model.fields) }
          </TableHead>
          { this.renderBody(model.id, model.outputs, model.fields, modelData) }
        </Table>
      </div>
    );
  }
}
