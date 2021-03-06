import React, { Component, PropTypes as Type } from 'react';
import './Image.styl';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import _get from 'lodash/get';
const host = 'http://localhost:3001';


import bemCn from 'bem-cn-fast';
const b = bemCn('image');

export default class Image extends Component {

  static propTypes = {
  }

  state = {
    loading: false,
    image: null
  };


  componentDidMount() {
    const { value } = this.props;
    this.setState({ image: value });
  }

  onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      this.uploadImage(file)
    });
  }

  uploadImage = (file) => {
    const uploadUrl = _get(this.props, 'params.uploadUrl');
    const model = _get(this.props, 'params.model');
    const fieldName = _get(this.props, 'name');
    const callbackFieldName = _get(this.props, 'params.name');
    this.setState({ loading: true });
    this.props.dataActions.upload(model, uploadUrl, file, fieldName)
    .then((res) => {
      if (!_get(res, 'status')) return;
      const image = _get(res, callbackFieldName);
      this.setState({ loading: false, image });
      this.props.onChange(image);
    })
  }

  render() {
    const { label } = this.props;
    const { loading, image } = this.state;
    let dropzoneRef;
    return (
      <div className={b()}>
        <div className={b('label')}>{label}</div>

        <div className={b('images')}>
          {
            image && (<img className={b('image')} src={`${host}${image}`} />)
          }
        </div>
        <div className={b('body')}>
          <Dropzone
            ref={(node) => { dropzoneRef = node; }}
            onDrop={this.onDrop}
            className={b('dropzone')}
            multiple={false}
          >
            <p className={b('text')}>Перетащите файл сюда</p>
          </Dropzone>
          <FlatButton
            className={b('button')}
            primary={true}
            label={'Выбрать файл'}
            type="button"
            variant="contained"
            color="default"
            onClick={() => { dropzoneRef.open() }}
          >

          </FlatButton>
          {
            loading && (
              <div className={b('loading')}>
                <CircularProgress />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
