import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, CardMedia, CardTitle } from 'material-ui/Card';
import { pageLoaded } from './utils';
import { Box, Carousel, Anchor, Image } from 'grommet';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link, withRouter, Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillMount() {
    axios.get('http://39.104.87.44:8017/auth/articles').then((response) => {
      this.setState({
        articles: response.data,
        redirect: false,
        path: ''
      });
    });
  }
  componentDidMount() {
    pageLoaded('Home');
  }
  render() {
    const { articles, redirect, path } = this.state;
    console.log(this.state);
    if (!articles) {
      return null;
    }
    if (redirect) {
      window.location = { path };
    }
    const cards = articles.map((article) => {
      return (
        <MuiThemeProvider>
          <Card onClick={() => {
            window.location = `/article/${article.id}`;
          }} >
            <CardMedia overlay={<CardTitle title={article.title} />}>
              <Image src={article.content[0]} className='cardImg'/>
            </CardMedia>
          </Card>
        </MuiThemeProvider>
      );
    });

    return (
      <Box align='center'>
        <Carousel className='carousel' id='carousel'>
          {cards}
        </Carousel>

      </Box>
    );
  }
}

Home.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Home);
