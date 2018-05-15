// import Auth from './Auth';
import config from '../../config';
import qs from 'query-string';
import request from 'axios';
import { Cookies } from 'react-cookie';


export default (params) => {
  const method = params.method;
  const cookies = new Cookies();
  const accessToken = cookies.get('access_token');

  const query = params.query ? `?${ qs.stringify(params.query) }` : '';
  const port = config.api.port ? `:${ config.api.port }` : '';
  const url = `${ params.host || config.api.host }${ port }${ params.path }${ query }`;
  const responseType = 'json';

  const headers = {
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    'Content-Type': 'multipart/form-data; charset=UTF-8',
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // 'Accept-Charset': 'utf-8',
    Authorization: `Bearer ${ accessToken || '' }`,

  };

  if (params.auth) Object.assign(headers, params.auth);
  const requestParams = { method, url, responseType, headers };

  if (params.data) requestParams.data = params.data;
  console.log('requestParams', requestParams);
  return request(requestParams);
};
