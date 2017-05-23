import React, { Component } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './App.css';
import ContractTable from './components/ContractTable.js';
import SearchInput from './components/SearchInput.js';
import SortForm from './components/SortForm.js';
import KeyFilterForm from './components/KeyFilterForm.js';
import ContractDetails from './components/ContractDetails.js';

class App extends Component {
  // Aplicação principal

  constructor(props) {
    super(props);

    this.keys = Object.keys(this.props.contracts[0]).filter(k => k.localeCompare('id') !== 0); // Lista de colunas
    this.contracts = props.contracts; // Lista com os contratos

    // Corrige o escopo das funções que tratarão eventos
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.saveEdited = this.saveEdited.bind(this);
    this.handleDetailedClick = this.handleDetailedClick.bind(this);

    // Lista de colunas de devem ser mostrados na tabela
    var showKeys = {};
    for (var i in this.keys) {
      showKeys[this.keys[i]] = true;
    }
    showKeys['id'] = false;

    this.state = {
      detailedView: false, // Flag para visão detalhada de um contrato
      detailedId: null, // ID do contrato que terá os detalhes exibido
      showKeys: showKeys, // Colunas que deverão ser mostradas
      sortByKey: null, // Coluna utilizada para ordenar
      sortAsc: true, // Flag para ordenação crescente
      search: '' // Input inicial da busca
    };
  }

  handleDetailedClick(id) {
    // Trata o evento do clique em um contrato para exibir os seus detalhes
    this.setState({
      detailedView: true,
      detailedId: id
    });
  }

  handleSearchChange(searchQuery) {
    // Trata o evento da busca, alterando a string utilizada para filtrar os contratos
    this.setState({search: searchQuery});
  }

  handleSortChange(name, value) {
    // Altera o valor da coluna que será utilizada para ordenar os contratos. Também modifica o tipo de ordenação
    this.setState({
      [name]: value
    });
  }

  handleFilterChange(name, value) {
    // Altera as colunas que serão exibidas
    this.setState((prevState, props) => {
      var shouldShowKeys = prevState.showKeys;
      shouldShowKeys[name] = value;
      return {showKeys: shouldShowKeys};
    });
  }

  filterData() {
    // Realiza a busca a partir da string de query informada, buscando em todas as colunas.
    const keys = this.keys;
    const data = this.props.contracts.filter(contract => {
      for (var i in keys) {
        if (contract[keys[i]].toLowerCase().includes(this.state.search)) {
          return true;
        }
      }
      return false;
    });
    return data;
  }

  sortData(dataToSort) {
    // Ordena os contrados a partir da coluna escolhida pelo usuário
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
    /* 'Persiste' as modificações realizadas pelo usuário
     Note que, no caso de uma aplicação real, aqui seriam
     realizadas chamadas ao banco de dados para, de fato,
     salvar os novos valores) */
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
      // Exibe todos os dados em forma de tabela.

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
      // Exibe os dados de um único contrato de forma detalhada.
      return (
        <div className="container-fluid">
          <ContractDetails contract={this.props.contracts[this.state.detailedId]} keys={this.keys} saveEdited={this.saveEdited}/>
        </div>
      );
    }
  }
}

export default App;
