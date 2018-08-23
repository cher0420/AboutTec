/**
 * 文章展示模版
 */
import React, { Component } from 'react';
import URL from "../../components/BaseUrl";
import emitter from '../../services/events';
import { Row, Col } from 'antd';
import './index.css';
import '../../style/quill.bubble.css'
import '../../style/quill.core.css'
import '../../style/quill.snow.css'

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
    fetch(URL.getManageBaseUrl + "api/ContentManagement/GetContent?id=" + contentId, options)
      .then(response => response.json())
      .then((res) => {
        this.setState({
          siteContent: res.ContentManagement.Content
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
   htmlDecodeByRegExp =  (str) => {
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/&amp;/g, '&')
        s = s.replace(/&lt;/g, '<')
        s = s.replace(/&gt;/g, '>')
        s = s.replace(/&nbsp;/g, ' ')
        s = s.replace(/&#39;/g, "\'")
        s = s.replace(/&quot;/g, '"')
        return s
    }
  render() {
    return(
      <main>
        <Row className="article-content ql-editor">
          <Col sm={{ span: 24 }} md={{ offset: 5, span: 14 }}>
            <div dangerouslySetInnerHTML={{__html:this.htmlDecodeByRegExp(this.state.siteContent)}}></div>
          </Col>
        </Row>
      </main>
    )
  }
}

export default ArticleContent;
