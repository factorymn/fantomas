import cookie from 'react-cookie';
import _forEach from 'lodash/forEach';

export default function (cookiesObject) {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));

  const defaultOptions = {
    path: '/',
    expires: expirationDate
  };

  _forEach(cookiesObject, (item, key) => {
    cookie.save(key, item.value, Object.assign({}, defaultOptions, item.options));
  });
}
