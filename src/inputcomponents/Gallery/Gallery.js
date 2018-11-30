import React, { Component, PropTypes as Type } from 'react';
import './Gallery.styl';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _random from 'lodash/random';
import _forIn from 'lodash/forIn';
import _set from 'lodash/set';
import IconButton from 'material-ui/IconButton';
import IconRemove from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
const host = 'http://localhost:3001';

const style = {
  width: '160px'
}

import bemCn from 'bem-cn-fast';
const b = bemCn('gallery');

export default class Gallery extends Component {

  static propTypes = {
  }

  state = {
    loading: false,
    images: {}
  };


  componentDidMount() {
    const { value } = this.props;
    this.setState({ images: JSON.parse(value) || {} });
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
      const images = _cloneDeep(this.state.images);
      const _id = Date.now() + _random(10, 90);
      const imageBlock = {
        id: _id,
        order: 0,
        imageUrl: image,
        title: '',
        description: ''
      }
      images[_id] = imageBlock;
      this.setState({ loading: false, images });
      this.props.onChange(JSON.stringify(images));
    })
  }

  handleInputChange = (imageId, inputType, e, value) => {
    const images = _cloneDeep(this.state.images);
    _set(images, `${imageId}.${inputType}`, value);
    this.setState({ images });
    this.props.onChange(JSON.stringify(images));
  }

  handleRemoveImage = (imageId) => {
    const images = _cloneDeep(this.state.images);
    delete images[imageId];
    this.setState({ images });
    this.props.onChange(JSON.stringify(images));
  }

  renderGallery() {
    const { images } = this.state;
    const _images = [];
    _forIn(images, (image, imageId) => {
      _images.push(
        (
          <div key={imageId} className={b('block')}>
            <img
            className={b('image')}
            src={`${host}${image.imageUrl}`}
            alt={image.title}
            />
            <br />
            <TextField
              floatingLabelText="Заголовок"
              name={'title'}
              onChange={this.handleInputChange.bind(this, image.id, 'title')}
              style={style}
              value={image.title}
            />
            <br />
            <TextField
              floatingLabelText="Описание"
              multiLine={true}
              rows={1}
              rowsMax={2}
              style={style}
              name={'description'}
              onChange={this.handleInputChange.bind(this, image.id, 'description')}
              value={image.description}
            />
            <div className={b('block-controls')}>
              <IconButton
                onClick={this.handleRemoveImage.bind(this, image.id)}
              >
                <IconRemove />
              </IconButton>
            </div>
          </div>
        )
      )
    });
    return _images;
  }

  render() {
    const { label } = this.props;
    const { loading, images } = this.state;
    // console.log(images);
    let dropzoneRef;
    return (
      <div className={b()}>
        <div className={b('label')}>{label}</div>

        <div className={b('images')}>
          {
            this.renderGallery()
            /*image && (<img className={b('image')} src={`${host}${image}`} />)*/
          }
        </div>
        <div className={b('body')}>
          <Dropzone
            ref={(node) => { dropzoneRef = node; }}
            onDrop={this.onDrop}
            className={b('dropzone')}
            multiple={true}
          >
            <p className={b('text')}>Перетащите файлы сюда</p>
          </Dropzone>
          <FlatButton
            className={b('button')}
            primary={true}
            label={'Выбрать файлы'}
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
