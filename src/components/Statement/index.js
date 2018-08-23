/**
 * 声明
 */
import React, { Component } from 'react';

class Statement extends Component{
  render() {
    return(
      <div style={{ textAlign: "left", color: "#999999", fontSize: "12px", lineHeight: "20px" }}>
        <p>
          点击"创建我的账户"即表示您同意我们的<a href="">条款和条件</a>以及<a href="">默认通信首选项</a>。
        <br/>
          点击"创建我的账户"之前，本站承诺不会保存用户与公司信息。</p>
      </div>
    )
  }
}
export default Statement;