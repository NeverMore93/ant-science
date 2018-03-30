import React, { Component } from 'react';
import { pageLoaded } from './utils';
import { Box, Heading, Paragraph } from 'grommet';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  componentDidMount() {
    pageLoaded('About');
  }
  render() {
    return (
      <Box align='center'>
        <Heading strong={true} align='center' tag='h2'>
          关于蚂蚁科学
        </Heading>
        <Paragraph>&nbsp;&nbsp;蚂蚁科学成立于2017年，是一个以文章和视频为主要输出的科学科普类媒体平台。蚂蚁科学致力于对大众科学知识的普及和科学意识的传播。蚂蚁科学也覆盖全网几乎所有平台（微博，今日头条，新浪网，腾讯等），为多用户提供科普服务。
        </Paragraph>
        <Paragraph>&nbsp;&nbsp;关于蚂蚁科学的名字由来（使命）：我们在渺茫的科学殿堂中，就如蚂蚁一样渺小，但我们也像蚂蚁一样，集全人类之力而上下求索，而我们也如蚂蚁一样将所有的成果搬运科普给所有人。</Paragraph>
        <span>总部地址</span>
        <span>四川省遂宁市河东新区香林南路300号遂宁万达广场2栋13楼8号</span>
        <br/>
        <span>投稿邮箱：Antscience@foxmail.com </span>
        <span>加入我们：983873181@qq.com</span>
        <span>商务合作：邮箱Antscience@foxmail.com（注明商务合作</span>
        <span>成为专栏明星作者请联系微信：17738724183</span>

      </Box>
    );
  }
}
