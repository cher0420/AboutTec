import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class FieldBox extends Component {
  render() {
    return(
     <div className="field-box">
       <figure>
         <figcaption className="show" style={{ background: `url("${ this.props.field.DomainImage }") center no-repeat`,backgroundSize:'cover' }}>
           <img src={ this.props.field.DomainIcon } alt="" />
           <h2>{ this.props.field.DomainName }</h2>
           <div className="line" />
         </figcaption>
         <figcaption className="description">
           <img src={ this.props.field.DomainIcon } alt="" />
           <h2>{ this.props.field.DomainName }</h2>
           <Link className="field-box-link" to={ "/marketplace/" + this.props.field.ID}>查看详情</Link>
         </figcaption>
       </figure>
     </div>
    )
  }
}
export default FieldBox;
