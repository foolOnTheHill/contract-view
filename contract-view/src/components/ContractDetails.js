import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class ContractDetails extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = JSON.parse(JSON.stringify(this.props.contract));
  }

  handleSubmit() {
    var newContract = this.state;
    var id = this.state.id;
    this.props.saveEdited(id, newContract);
  }

  handleChange(event) {
    var dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}$/;

    const target = event.target;
    const newValue = target.value.match(dateReg) ? target.value.split("-").reverse().join("-") : target.value;
    const name = target.name;

    this.setState({
      [name]: newValue
    });
  }

  getFormInputs() {
    var dateReg1 = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    var dateReg2 = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    var forms = this.props.keys.map((k, index) => (
      <div className="form-group" key={index}>
        <label>{k}</label>
        <input
          type={(this.state[k].match(dateReg1) || this.state[k].match(dateReg2)) ? "date" : "text"}
          className="form-control"
          value={this.state[k].match(dateReg1) ? this.state[k].split("-").reverse().join("-") : this.state[k]}
          onChange={this.handleChange}
          name={k} />
      </div>
    ));

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
