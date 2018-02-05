import React, { Component } from 'react';
import axios from 'axios/index';
import { Label } from 'grommet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import '../../scss/braft.scss';

export default class AddEssay extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  handleChange(content) {
    console.log(content);
  }

  handleHTMLChange(html) {
    console.log(html);
  }

  render() {
    /* const BoxStyle = { width: '80%' }; */
    const titleStyle = { width: '40%', 'margin-left': '300px', 'margin-top': '10px' };
    const labelStyle = {
      'margin-left': '30px', 'font-family': '黑体', 'font-size': '20px', 'margin-bottom': '20px',
      'font-weight': 'bold', 'margin-top': '120x'};
    const titleHintStyle = {
      'font-weight': 'bold', 'font-size': '30px', 'padding-top': '10px', 'padding-bottom': '10px' };
    const editorProps = {
      height: 500,
      initialContent: this.state.content,
      onChange: this.handleChange,
      onHTMLChange: this.handleHTMLChange
    }
    return (
      <div>
        <Label style={labelStyle}>写文章</Label>
        <br />
        <MuiThemeProvider>
          <TextField hintText='请输入标题' fullWidth={true} style={titleStyle} hintStyle={titleHintStyle} inputStyle={titleHintStyle} />
        </MuiThemeProvider>
        <br />
        <BraftEditor {...editorProps} />
      </div>
    );
  }
}
