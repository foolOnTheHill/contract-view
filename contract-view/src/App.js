import React, { Component } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './App.css';
import ContractTable from './components/ContractTable.js';

class App extends Component {
  render() {
    const keys = Object.keys(this.props.contracts[0]);
    const data = this.props.contracts;

    return (
      <div className="container-fluid">
        <div className="row">
          <input className="form-control text-center" placeholder="Search"/>
        </div>
        <br/>
        <div className="row">
          <ContractTable keys={keys} contracts={data}/>
        </div>
      </div>
    );
  }
}

export default App;
