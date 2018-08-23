import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class FieldBox extends Component {
    render() {
        return(
            <div className="field-box">
                <figure>
                    <figcaption className="show" style={{ background: `url("${ this.props.field.domainImage }") center no-repeat`,backgroundSize:'cover' }}>
                        <img src={ this.props.field.domainIcon } alt="" />
                        <h2>{ this.props.field.domainName }</h2>
                        <div className="line" />
                    </figcaption>
                    <figcaption className="description">
                        <img src={ this.props.field.domainIcon } alt="" />
                        <h2>{ this.props.field.domainName }</h2>
                        <Link className="field-box-link" to={ "/marketplace/" + this.props.field.id }>查看详情</Link>
                    </figcaption>
                </figure>
            </div>
        )
    }
}
export default FieldBox;
