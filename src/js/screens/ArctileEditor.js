import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import { Box } from 'grommet';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

require('draft-js/dist/Draft.css');


export default class ArctileEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      content : null
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    const { editorState } = this.state;
    const editorProps = {
      height: 500,
      initialContent: this.state.content
    };
    return (
      <Box align='center' style={{width:'60%'}}>
        <BraftEditor {...editorProps} />
      </Box>
    );
  }
}
