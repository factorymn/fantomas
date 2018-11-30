import React, { Component, PropTypes as Type } from 'react';
import './Editor.styl';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import bemCn from 'bem-cn-fast';
const b = bemCn('editor');

export default class Editor extends Component {

  static propTypes = {
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      // ['color', 'background'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['code-block'],
      ['clean'],
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  state = {
    text: this.props.value || ''
  };


  componentDidMount() {
    // const { value } = this.props;
  }

  handleChange = (value) => {
    // this.setState({ text: value });
    this.props.onChange(value);
  }

  render() {
    return (
      <div className={b()}>
        <ReactQuill
          value={this.props.value}
          onChange={this.handleChange}
          modules={this.modules}
        />
      </div>
    );
  }
}
