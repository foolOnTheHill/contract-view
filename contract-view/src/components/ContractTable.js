import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import ContractRow from './ContractRow.js';

class ContractTable extends Component {
  getTableHeader() {
    const cols = this.props.tableHeaderKeys.map((k, index) => <th key={index}>{k}</th>);
    return cols;
  }

  getTableData() {
    var contracts = JSON.parse(JSON.stringify(this.props.contracts));

    for (var i in contracts) {
      for (var j in this.props.hideKeys) {
        delete contracts[i][this.props.hideKeys[j]];
      }
    }

    const tableData = contracts.map((c, index) => <ContractRow id={this.props.contracts[index].id} handleClick={this.props.handleClick} key={index} contract={c}/>);
    return tableData;
  }

  render() {
    const tableHeader = this.getTableHeader();
    const tableData = this.getTableData();

    return (
      <div className="row">
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
      </div>
    );
  }
}

export default ContractTable;
