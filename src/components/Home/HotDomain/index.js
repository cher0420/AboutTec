/**
 * 热门领域
 */
import React, { Component } from 'react';
import FieldBox from './FieldBox';
import { Row, Col } from 'antd';
import URL from '../../BaseUrl';
import './index.css';

class HotDomain extends Component {
    constructor(props) {
        super(props);
        this.state={ hotFields: [] };
    }

    componentWillMount() {
        const options = {
            headers: {'Content-Type': 'application/json; charset=utf-8'},
        };
        fetch(URL.getManageBaseUrl + "domain/common", options)
            .then(response => response.json())
            .then((res) => {
                this.setState({ hotFields: res });
            });
    };
    render() {
        const fieldBoxs = [];
        this.state.hotFields.forEach((field, index) => {
            fieldBoxs.push(
                <Col xl={6} md={12} sm = {12} xs={ 12 } key={ index } xxl={6} lgclassname="hot-domain-field" style={{marginBottom:'20px'}}>
                    <FieldBox field={ field }/>
                </Col>
            )
        });
        return(
            <main className="hot-domain">
                <h1>热门领域</h1>
                <Row gutter={ 16 } className="column-diff">
                    { fieldBoxs }
                </Row>
            </main>
        )
    }
}
export default HotDomain;
