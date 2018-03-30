import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginLayer from './LoginLayer';
import { navResponsive } from '../actions/nav';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Tasks from '../screens/Tasks';
import Task from '../screens/Task';
import NotFound from '../screens/NotFound';
import Home from '../screens/Home';
import HeadeBar from './HeadeBar';
import Essay from '../screens/Essay';
import AddEssay from '../screens/AddEssay';
import About from '../screens/About';
import ArticleEditor from '../screens/ArctileEditor';

import { Box, App } from 'grommet';

class Main extends Component {
  constructor(props) {
    super(props);
    this._onResponsive = this._onResponsive.bind(this);
    this.state = {
      showLogin: false
    };
  }

  _onResponsive(responsive) {
    this.props.dispatch(navResponsive(responsive));
  }

  render() {
    const onLogin = () => {
      this.setState({
        showLogin: true
      });
    };

    const onClose = () => {
      this.setState({
        showLogin: false
      });
    };
    const { showLogin } = this.state;
    return (
      <App centered={false}>
        <Router>
          <Box>
            <HeadeBar login={onLogin} />
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path='/home' component={Home} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/login' component={Login} />
              <Route path='/tasks/:id' component={Task} />
              <Route path='/tasks' component={Tasks} />
              <Route path='/article/:id' component={Essay} />
              <Route path='/addEssay' component={AddEssay} />
              <Route path='/about' component={About} />
              <Route path='/articleEditor' component={ArticleEditor} />
              <Route path='/*' component={NotFound} />
            </Switch>
            {showLogin && <LoginLayer onClose={onClose} />}
          </Box>
        </Router>
      </App>
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(Main);
