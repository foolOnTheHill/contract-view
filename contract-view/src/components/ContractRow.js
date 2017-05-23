import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class ContractRow extends Component {
  // Componente responsável por renderizar uma linha da tabela de dados

  constructor(props) {
    super(props);

    // Corrige o escopo das funções que tratarão eventos
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    /* Informa o ID do contrato selecionado para o componente pai,
     de forma que seus detalhes sejam exibidos */
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
