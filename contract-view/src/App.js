import React, { Component } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './App.css';
import ContractTable from './components/ContractTable.js';
import SearchInput from './components/SearchInput.js';
import SortForm from './components/SortForm.js';
import KeyFilterForm from './components/KeyFilterForm.js';
import ContractDetails from './components/ContractDetails.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.keys = Object.keys(this.props.contracts[0]).filter(k => k.localeCompare('id') !== 0);
    this.contracts = props.contracts;

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.saveEdited = this.saveEdited.bind(this);
    this.handleDetailedClick = this.handleDetailedClick.bind(this);

    var showKeys = {};

    for (var i in this.keys) {
      showKeys[this.keys[i]] = true;
    }
    showKeys['id'] = false;

    this.state = {
      detailedView: false,
      detailedId: null,
      showKeys: showKeys,
      sortByKey: null,
      sortAsc: true,
      search: ''
    };
  }

  handleDetailedClick(id) {
    this.setState({
      detailedView: true,
      detailedId: id
    });
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
    const keys = this.keys;
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

  sortData(dataToSort) {
    const compKey = this.state.sortByKey;
    const data = dataToSort.sort((a, b) => {
      return a[compKey].localeCompare(b[compKey]);
    });

    if (this.state.ascSort === false) {
      return data.reverse();
    } else {
      return data;
    }
  }

  saveEdited(id, newValue) {
    this.props.contracts[id] = newValue;
    this.setState({
      detailedView: false,
      detailedId: null,
      sortByKey: null,
      sortAsc: true,
      search: ''
    });
  }

  render() {
    const keys = this.keys;

    if (!this.state.detailedView) {
      var tmpData = this.state.search !== '' ? this.filterData() : this.props.contracts;
      const data = this.state.sortByKey === null ? tmpData : this.sortData(tmpData);

      var hideKeys = ['id'];
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
          <ContractTable handleClick={this.handleDetailedClick} tableHeaderKeys={tableHeaderKeys} hideKeys={hideKeys} contracts={data}/>
          <br />
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <ContractDetails contract={this.props.contracts[this.state.detailedId]} keys={this.keys} saveEdited={this.saveEdited}/>
        </div>
      );
    }
  }
}

export default App;
