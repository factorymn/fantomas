import './LoginPage.styl';

import React, {
  Component,
  PropTypes as Type
} from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageActions } from 'actions';
import { withCookies, Cookies } from 'react-cookie';
import _get from 'lodash/get';
// import _random from 'lodash/random';
import apiCall from '../../utils/apiCall';
import { withRouter } from 'react-router-dom';

import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton
} from 'material-ui';

const style = {
  reset: {
    padding: '0'
  },
  block: {
    padding: '25px'
  },
  title: {
    padding: '0',
    textAlign: 'center'
  },
  button: {
    marginTop: '15px',
    width: '100%',
    taxtAlign: 'center'
  }
};

const required = value => (value == null ? 'Обязательное поле' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный e-mail'
    : undefined);

@connect(state => ({
  page: state.pageReducer,
}), dispatch => ({
  actions: bindActionCreators(PageActions, dispatch)
}))

class LoginPage extends Component {

  static propTypes = {
    page: Type.object,
    handleSubmit: Type.func,
    history: Type.object,
    actions: Type.object,
    cookies: Type.instanceOf(Cookies).isRequired
  }

  state = {
    errorLoginData: ''
  }

  onSubmit(formData) {
    // this.props.actions.auth(formData);
    const { cookies } = this.props;
    // const deviceId = `admin_${ _random(10000001, 99999999) }`;
    const query = {
      // device_id: deviceId,
      // device: 'web',
      ...formData
    };
    const redirectRoute = this.props.page.project.models[0].route;

    apiCall({
      method: 'POST',
      path: '/user/login',
      query
    })
    .then(res => {
      const user = _get(res, 'data.response.user', {});

      cookies.set('email', user.email, { path: '/' });
      // cookies.set('device_id', deviceId, { path: '/' });
      cookies.set('access_token', user.access_token.token, { path: '/' });
      cookies.set('expiresDate', user.access_token.expiresDate, { path: '/' });

      this.props.history.replace(`${ redirectRoute }`);
    })
    .catch(error => {
      console.log(error);
      this.setState({ errorLoginData: 'Неверный логин или пароль' });
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { errorLoginData } = this.state;
    // const heading = _get(this.props, 'page.project.name');

    return (
      <div className="login-page-root">
        <div className="login-logo">
          <img alt="" src="/images/logo.png" />
        </div>
        {/*<h1 className="login-h1">{heading}</h1>*/}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <Card style={style.block}>
            <CardTitle title="Вход" style={style.title} />
            <CardText style={style.reset}>
              <Field
                name={'email'}
                component={TextField}
                hintText={'E-mail'}
                label={'E-mail'}
                floatingLabelText={'E-mail'}
                ref={'email'}
                type={'text'}
                withRef
                validate={[required, email]}
              />
              <Field
                name={'password'}
                component={TextField}
                hintText={'Пароль'}
                label={'Пароль'}
                floatingLabelText={'Пароль'}
                ref={'password'}
                type={'password'}
                withRef
                validate={required}
              />
            </CardText>
            <br />
            <div className="error-login-data">{errorLoginData}</div>
            <CardActions style={style.reset}>
              <FlatButton
                type="submit"
                label="Войти"
                style={style.button}
                primary={true}
              />
            </CardActions>
          </Card>
        </form>
        <div className="copyright">
          by <a className="copyright-link" href="http://factory.mn" target="_blank">Manufactura</a>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'auth'
})(withCookies(withRouter(LoginPage)));
