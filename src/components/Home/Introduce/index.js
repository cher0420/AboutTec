/**
 * 介绍模块
 */
import React, { Component } from 'react';
import Divider from './Divider';
import IntroduceBox from './IntroduceBox';
import Robot from '../../../img/robot.png';
import ChannelsIcon from '../../../img/icon5.png';
import RobotsIcon from '../../../img/icon6.png';
import BasesIcon from '../../../img/icon7.png';
import SesionsIcon from '../../../img/icon8.png';
import './index.css';

class Introduce extends Component {
  render() {
    return(
      <section className="introduce">
        <img src={ Robot } alt="" />
        <div className="content">
          <Divider/>
          <IntroduceBox img={ ChannelsIcon }
                        title="多渠道支持"
                        description="移动应用、网页、公众号等"
          />
          <Divider/>
          <IntroduceBox img={ RobotsIcon }
                        title="多机器人实例"
                        description="满足不同服务群体的需求"
          />
          <Divider/>
          <IntroduceBox img={ BasesIcon }
                        title="智能本体知识库"
                        description="百科型知识库结构"
          />
          <Divider/>
          <IntroduceBox img={ SesionsIcon }
                        title="多轮对话配置"
                        description="满足复杂的任务型问答场景"
          />
          <Divider/>
        </div>

      </section>
    )
  }
}

export default Introduce;