import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class KeyFilterForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {};
  }

  componentWillMount() {
    for (var i in this.props.options) {
      this.setState({
        [this.props.options[i]]: true
      });
    }
  }

  handleChange(event) {
    const newValue = event.target.checked;
    const name = event.target.name;

    this.setState({
      [name]: newValue
    });
    this.props.handleChange(name, newValue);
  }

  getOptions() {
    const optionsList = this.props.options.map((option, index) => {
      return (
        <label key={index} className="checkbox-inline">
          <input type="checkbox" name={option} checked={this.state[option]} onChange={this.handleChange}/>
          {option}
        </label>
      );
    });
    return optionsList;
  }

  render() {
    var optionsList = this.getOptions();
    return (
      <div className="row">
        <form className="form-inline">
          <label>Mostrar colunas</label>
          <br />
          {optionsList}
        </form>
      </div>
    );
  }
}

export default KeyFilterForm;
