import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class ContractRow extends Component {
  getColumnValues() {
    const vals = Object.values(this.props.contract);
    var dataList = vals.map((v, index) => <td key={index}>{v}</td>);
    return dataList;
  }

  render() {
    const values = this.getColumnValues();
    return <tr>{values}</tr>;
  }
}

export default ContractRow;
