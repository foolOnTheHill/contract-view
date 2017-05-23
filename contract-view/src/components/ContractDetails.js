import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class ContractDetails extends Component {
  constructor(props) {
    super(props);

    // Corrige o escopo das funções que tratarão eventos
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      contract: JSON.parse(JSON.stringify(this.props.contract)),
      error: false
    };
  }

  validateData() {
    // Verifica se os valores informados pelo usuário são válidos
    for (var index in this.props.keys) {
      const key = this.props.keys[index];
      if (!this.state.contract[key]) {
        return false;
      }
    }
    return true;
  }

  handleSubmit() {
    // Persiste os novos valores, caso eles sejam válidos.

    var newContract = this.state.contract;
    const id = this.state.contract.id;
    const isValid = this.validateData();

    if (isValid) {
      this.props.saveEdited(id, newContract);
      alert("Edições salvas com sucesso!");
    } else {
      alert("Por favor, digite as informações corretamente!");
      this.setState({
        error: true
      });
    }
   }

  handleChange(event) {
    // Salva no estado do componente os novos valores informados pelo usuário.
    
    var dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}$/;

    const target = event.target;
    const newValue = target.value.match(dateReg) ? target.value.split("-").reverse().join("-") : target.value;
    const name = target.name;

    var newContract = this.state.contract;
    newContract[name] = newValue;

    this.setState({
      contract: newContract
    });
  }

  getFormInputs() {
    const dateReg1 = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    const dateReg2 = /^\d{4}[./-]\d{2}[./-]\d{2}$/;

    var forms = this.props.keys.map((k, index) => {
      const inputType = (this.state.contract[k].match(dateReg1) || this.state.contract[k].match(dateReg2)) ? "date" : "text";
      const inputValue = this.state.contract[k].match(dateReg1) ? this.state.contract[k].split("-").reverse().join("-") : this.state.contract[k]
      const inputClass = this.state.contract[k] ? "form-group has-success" : "form-group has-error";

      return (
        <div className={inputClass} key={index}>
          <label>{k}</label>
          <input
            type={inputType}
            className="form-control"
            value={inputValue}
            onChange={this.handleChange}
            name={k} />
        </div>
      );
    });

    return forms;
  }

  render() {
    const inputs = this.getFormInputs();

    return (
      <div className="row">
        <form>
          {inputs}
        </form>
        <br />
        <button className="btn btn-primary" onClick={this.handleSubmit}>Salvar</button>
        <br />
        <br />
      </div>
    );
  }
}

export default ContractDetails;
