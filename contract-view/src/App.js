import React, { Component } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './App.css';
import ContractTable from './components/ContractTable.js';
import SearchInput from './components/SearchInput.js';
import SortForm from './components/SortForm.js';
import KeyFilterForm from './components/KeyFilterForm.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.keys = Object.keys(this.props.contracts[0]);
    this.contracts = props.contracts;

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);

    var showKeys = {};

    for (var i in this.keys) {
      showKeys[this.keys[i]] = true;
    }

    this.state = {
      showKeys: showKeys,
      sortByKey: null,
      sortAsc: true,
      search: ''
    };
  }

  handleSearchChange(searchQuery) {
    this.setState({search: searchQuery});
  }

  handleSortChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleFilterChange(name, value) {
    this.setState((prevState, props) => {
      var shouldShowKeys = prevState.showKeys;
      shouldShowKeys[name] = value;
      return {showKeys: shouldShowKeys};
    });
  }

  filterData() {
    const keys = Object.keys(this.props.contracts[0]);
    const data = this.props.contracts.filter(contract => {
      for (var i in keys) {
        if (contract[keys[i]].includes(this.state.search)) {
          return true;
        }
      }
      return false;
    });
    return data;
  }

  render() {
    const keys = Object.keys(this.props.contracts[0]);
    const data = this.state.search !== '' ? this.filterData() : this.props.contracts;

    var hideKeys = [];
    var tableHeaderKeys = [];
    for (var i in keys) {
      if (this.state.showKeys[keys[i]] === false) {
        hideKeys.push(keys[i]);
      } else {
        tableHeaderKeys.push(keys[i]);
      }
    }

    return (
      <div className="container-fluid">
        <SortForm handleChange={this.handleSortChange} options={keys} />
        <br />
        <KeyFilterForm options={keys} handleChange={this.handleFilterChange}/>
        <br />
        <SearchInput handleChange={this.handleSearchChange} />
        <br/>
        <ContractTable tableHeaderKeys={tableHeaderKeys} hideKeys={hideKeys} contracts={data}/>
      </div>
    );
  }
}

export default App;
