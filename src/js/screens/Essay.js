import React, { Component } from 'react';
import { Article, Headline, Paragraph, Section, Image } from 'grommet';
import axios from 'axios';
import _ from 'lodash';

export default class Essay extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    axios.get('http://39.104.87.44:8017/auth/article/id/'+id).then((response) => {
      this.setState({
        article: response.data
      });
    });
  }
  render() {
    const { article } = this.state;
    console.log(this.state);
    if (!article) {
      return null;
    }
    const content = article.content.map((str,index) => {
      return(
        _.startsWith(str, 'data:image/jpeg;base64') ?
          <Image className='image' src={str} /> : <Paragraph className='paragraph'>{str}</Paragraph>

      );
    });
    return (
      <Article className='essay'>
        <Section className='border'>
          <Headline className='title' size='small' align='left' >
            {article.title}
          </Headline>
          {article.author}{article.time == null ? '':'发表于' + article.createTime}
        </Section>
        <Section>
          {content}
        </Section>
      </Article>
    );
  }
}


