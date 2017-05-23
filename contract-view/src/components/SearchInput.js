import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class SearchInput extends Component {
  // Componente responsável por renderizar e tratar os valores inseridos na barra de busca.
  
  constructor(props) {
    super(props);

    // Corrige o escopo das funções que tratarão eventos
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    const newValue = event.target.value;
    this.setState({value: newValue});
    this.props.handleChange(newValue);
  }

  render() {
    return (
      <div className="row">
        <input className="form-control text-center" value={this.state.value} onChange={this.handleChange} placeholder="Buscar"/>
      </div>
    );
  }
}

export default SearchInput;
