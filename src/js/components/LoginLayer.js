import React, { Component } from 'react';
import axios from 'axios/index';
import { Box, Form, Layer, Tab, Tabs, Button } from 'grommet';
import { TextField, Toggle } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class LoginLayer extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillMount() {
    this.setState({
      loginName: '',
      loginPwd: '',
      regName: '',
      regPwd: ''
    });
    axios.post('').then((response) => {
      console.log(response);
    });
  }
  postLogin() {
    axios.post('', {
      loginName: 'Fred',
      loginPwd: 'Flintstone'
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  postSetUp() {
    const { onClose, loginName, loginPwd, regName, regPwd } = this.state;
    axios.post('', {
      setUpName: 'Fred',
      setUpPwd: 'Flintstone'
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _onChang(event, value) {
    this.setState({
      [event.target.name]: value
    });
  }

  render() {
    const { onClose, loginName, loginPwd, regName, regPwd } = this.state;
    console.log(this.state);
    const style = { margin: '20' };
    return (
      <Layer align='center' closer={true} onClose={onClose}>
        <Box style={style} >
          <MuiThemeProvider>
            <Tabs>
              <Tab title='登录' >
                <Toggle label='手机验证码登录' name='isPhoneLogin' onToggle={(event, isInputChecked) => {
                  this._onChang(event, isInputChecked);
                }} />
                <Form>
                  <TextField name='loginName' floatingLabelText='请输入用户名、手机号或邮箱登录' fullWidth={true} value={loginName} onChange={(event, newValue) => {
                    this._onChang(event, newValue);
                  }} />
                  <TextField name='loginPwd' floatingLabelText='请输入密码' type='password' fullWidth={true} value={loginPwd} onChange={(event, newValue) => {
                    this._onChang(event, newValue);
                  }} />
                </Form>
                <Button label='登录' type='submit' primary={true} onSubmit={this.postLogin()} style={{ marginRight: '5px', marginLeft: 'auto', display: 'inline-block' }} />
              </Tab>
              <Tab title='注册'>
                <Form>
                  <TextField name='regName' floatingLabelText='请输入用户名、手机号或邮箱登录' fullWidth={true} value={regName} onChange={(event, newValue) => {
                    this._onChang(event, newValue);
                  }} />
                  <TextField name='regPwd' floatingLabelText='请设置密码' type='password' fullWidth={true} value={regPwd} onChange={(event, newValue) => {
                    this._onChang(event, newValue);
                  }} />
                </Form>
                <Button label='注册' primary={true} type='submit' onSubmit={this.postSetUp()}style={{ marginRight: '5px', marginLeft: 'auto', display: 'inline-block' }} />
              </Tab>
            </Tabs>
          </MuiThemeProvider>
        </Box>
      </Layer>
    );
  }
}
