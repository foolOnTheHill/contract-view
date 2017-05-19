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
    const target = event.target;
    const newValue = target.value;
    const name = target.name;

    this.setState({
      [name]: newValue
    });
  }

  getFormInputs() {
    // var dateReg = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    var forms = this.props.keys.map((k, index) => (
      <div className="form-group" key={index}>
        <label>{k}</label>
        <input className="form-control" value={this.state[k]} onChange={this.handleChange} name={k}/>
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
