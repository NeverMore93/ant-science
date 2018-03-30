import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, CardMedia, CardTitle } from 'material-ui/Card';
import { pageLoaded } from './utils';
import { Box, Carousel, Anchor, Image, Heading, Label } from 'grommet';
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
    const { articles, path } = this.state;
    console.log(this.state);
    if (!articles) {
      return null;
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

    const articleList  = articles.map((article) => {
      console.log(article.content[1]);
      if (!article.content[1]) {
        return null;
      }
      return (
        <Box style={{ border: '1px groove', width: 'fill', background: '#B0E0E6' }}>
          <Label onClick={() => {
            window.location = `/article/${article.id}`;
          }}>
            {article.title}
          </Label>
          <span>{article.content[1].substring(0,40)+'...'}</span>
        </Box>
      );
    });

    return (
      <Box>
        <Box align='center'>
          <Carousel className='carousel' id='carousel'>
            {cards}
          </Carousel>
        </Box>
        <Box align='start' style={{marginTop: '20px',marginLeft: '20px'}}>
          {articleList}
        </Box>
      </Box>
    );
  }
}

Home.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Home);
