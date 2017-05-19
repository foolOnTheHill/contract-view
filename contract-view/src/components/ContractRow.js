import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class ContractRow extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.id);
  }

  getColumnValues() {
    const vals = Object.values(this.props.contract);
    var dataList = vals.map((v, index) => <td key={index}>{v}</td>);
    return dataList;
  }

  render() {
    const values = this.getColumnValues();
    return <tr onClick={this.handleClick}>{values}</tr>;
  }
}

export default ContractRow;
