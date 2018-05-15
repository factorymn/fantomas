import _get from 'lodash/get';

export function getParentModel(pathArray, last) {
  if (!pathArray[last]) return;
  const length = pathArray.length;
  return {
    model: pathArray[length - (last + 1)],
    modelId: pathArray[length - last],
    parent: getParentModel(pathArray, last + 2)
  };
}

export function getRouteInfo(props = this.props) {
  const pathArray = _get(props, 'location.pathname', '').split('/');
  pathArray.splice(0, 1);
  if (!pathArray[pathArray.length - 1]) {
    pathArray.splice(-1);
  }
  const pathArraylen = pathArray.length;
  const pathArrayLast = pathArraylen - 1;
  let routeInfo = {};
  if (pathArray[pathArrayLast] === 'new') {
    routeInfo = {
      action: 'new',
      model: pathArray[pathArraylen - 2],
      parent: getParentModel(pathArray, 3)
    };
  } else if (pathArray[pathArrayLast] === 'edit') {
    routeInfo = {
      action: 'edit',
      model: pathArray[pathArraylen - 3],
      modelId: pathArray[pathArraylen - 2],
      parent: getParentModel(pathArray, 4)
    };
  } else {
    if (!(pathArraylen % 2)) {
      routeInfo = {
        action: 'showOne',
        model: pathArray[pathArraylen - 2],
        modelId: pathArray[pathArraylen - 1],
        parent: getParentModel(pathArray, 3)
      };
    } else {
      routeInfo = {
        action: 'showAll',
        model: pathArray[pathArraylen - 1],
        parent: getParentModel(pathArray, 2)
      };
    }
  }
  return routeInfo;
}
