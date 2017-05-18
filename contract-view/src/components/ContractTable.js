import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import ContractRow from './ContractRow.js';

class ContractTable extends Component {
  getTableHeader() {
    const cols = this.props.keys.map((k, index) => <th key={index}>{k}</th>);
    return cols;
  }

  getTableData() {
    const tableData = this.props.contracts.map((c, index) => <ContractRow key={index} contract={c}/>);
    return tableData;
  }

  render() {
    const tableHeader = this.getTableHeader();
    const tableData = this.getTableData();
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>{tableHeader}</tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContractTable;
