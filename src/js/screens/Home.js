import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import { pageLoaded } from './utils';
import { Box,  Carousel } from 'grommet';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillMount() {
    axios.post('http://39.104.87.44:8017/allArticle').then((response) => {
      console.log(response);
      this.setState({
        articles:response.data
      });
    });
  }
  componentDidMount() {
    pageLoaded('Home');
  }

  render() {
    const { articles } = this.state;
    if (!articles) {
      return null;
    }
    console.log(articles);
    const cards = articles.map((article,articleIndex)=>{
      return (
        <MuiThemeProvider>
          <Card>
            <CardMedia overlay={<CardTitle title={article.title} />}>
              <img src={article.content[0]} className='cardImg' />
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
