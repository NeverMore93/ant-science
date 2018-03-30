import React, { Component } from 'react';
import axios from 'axios/index';
import { Box, Form, Layer, Tab, Tabs, Button } from 'grommet';
import { TextField, Toggle } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

class LoginLayer extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._getVerifyCode = this._getVerifyCode.bind(this);
    this._login = this._login.bind(this);
  }

  componentWillMount() {
    this.setState({
      loginName: '',
      loginPwd: '',
      regName: '',
      regPwd: ''
    });
  }

  _onChang(event, value) {
    this.setState({
      [event.target.name]: value
    });
  }

  _login(){
    const { isPhoneLogin, loginName, verifyCode } = this.state;
    if (isPhoneLogin) {
      // axios.get('http://39.104.87.44:8017/auth/verification/phone/'+loginName+'/code/'+verifyCode).then((response) => {
      axios.get('http://localhost:8080/auth/verification/phone/'+loginName+'/code/'+verifyCode).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.setState({
            loginNameErrorText: '验证码发送失败'
          });
        } else {
          this.setState({
            loginNameErrorText: '验证码发送失败'
          });
        }
      });
    }
  }

  _getVerifyCode() {
    const { loginName } = this.state;
    if (loginName.trim().length !== 11) {
      this.setState({
        loginNameErrorText: '手机号码格式有误'
      });
    } else {
      // axios.get('http://39.104.87.44:8017/auth/verification/phone/'+loginName).then((response) => {
      axios.get('http://localhost:8080/auth/verification/phone/'+loginName).then((response) => {
        console.log(response);
        if (response.status !== 200) {
          this.setState({
            loginNameErrorText: '验证码发送失败'
          });
        } else {
          const result = response.data;
          this.setState({
            loginNameErrorText: null
          });
        }
      });
    }
  }

  render() {
    const { onClose, loginName, loginPwd, regName, regPwd, isPhoneLogin, verifyCode, loginNameErrorText } = this.state;
    console.log(this.state);
    return (
      <Layer align='center' closer={true} onClose={onClose} style={{ height: 'auto' }}>
        <Box style={{ margin: '20' }} >
          <MuiThemeProvider>
            <Tabs>
              <Tab title='登录' >
                <Toggle label='手机验证码登录' name='isPhoneLogin' onToggle={(event, isInputChecked) => {
                  this._onChang(event, isInputChecked);
                }} />
                <Form>
                  <TextField name='loginName' floatingLabelText={(isPhoneLogin) ? '请输入手机号' : '请输入用户名、手机号或邮箱登录'} fullWidth={true} value={loginName} onChange={(event, newValue) => {
                    this._onChang(event, newValue);
                  }} errorText={loginNameErrorText} />
                  {(isPhoneLogin) ? <Box direction='row'><TextField name='verifyCode' floatingLabelText='请输入验证码' value={verifyCode} onChange={(event, newValue) => {
                  this._onChang(event, newValue);
                }} /><Button plain={true} label='发送验证码' accent={true} onClick={this._getVerifyCode} /></Box>
                    :
                    <TextField name='loginPwd' floatingLabelText='请输入密码' type='password' fullWidth={true} value={loginPwd} onChange={(event, newValue) => {
                      this._onChang(event, newValue);
                      }} />}
                </Form>
                <Button label='登录' type='submit' primary={true} style={{ marginRight: '5px', marginLeft: 'auto', display: 'inline-block' }} onClick={this._login} />
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
                <Button label='注册' primary={true} type='submit' style={{ marginRight: '5px', marginLeft: 'auto', marginTop: '10px', position: 'absolute' }} />
              </Tab>
            </Tabs>
          </MuiThemeProvider>
        </Box>
      </Layer>
    );
  }
}

const select = state => ({
  session: state.session
});
export default connect(select)(LoginLayer);
