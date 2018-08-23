/**
 * 文章展示模版
 */
import React, { Component } from 'react';
import URL from "../../components/BaseUrl";
import emitter from '../../services/events';
import { Row, Col } from 'antd';
import './index.css';

class ArticleContent extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      siteContent: ""
    }
  }

  getContent = (id) => {
    const options = {
      headers: {'Content-Type': 'application/json; charset=utf-8'},
    };
    const contentId = id;
    fetch(URL.getManageBaseUrl + "/content?id=" + contentId, options)
      .then(response => response.json())
      .then((res) => {
        this.setState({
          siteContent: res.content
        });
      });
  };

  componentDidMount() {
    emitter.emit("setNarBackground", '#0e2052');
    this.getContent(this.props.match.params.id);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({siteContent: ""});
    this.getContent(nextProps.match.params.id);
  };

  componentWillUnmount() {
    emitter.emit("setNarBackground", 'none');
  }

  render() {
    return(
      <main>
        <Row className="article-content">
          <Col sm={{ span: 24 }} md={{ offset: 5, span: 14 }}>
            <div dangerouslySetInnerHTML={{__html:this.state.siteContent}}></div>
          </Col>
        </Row>
      </main>
    )
  }
}

export default ArticleContent;