import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class SortForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      sortByKey: props.options[0],
      ascSort: true
    };
  }

  handleChange(event) {
    const target = event.target;
    const newValue = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: newValue
    });
    this.props.handleChange(name, newValue);
  }

  getOptions() {
    const optionsList = this.props.options.map((option, index) => <option key={index} value={option}>{option}</option>);
    return optionsList;
  }

  render() {
    const options = this.getOptions();
    const sortTextLabel = "Ordenar por";
    const sortTypeLabel = "Ordem crescente";

    return (
      <div className="row">
        <form className="form-inline">
          <div className="form-group">
            <label>{sortTextLabel}</label>
            <select className="form-control" name="sortByKey" value={this.state.sortByKey} onChange={this.handleChange}>
              {options}
            </select>
          </div>
          <div className="form-group">
            <label>{sortTypeLabel}</label>
            <input
              className="form-control"
              name="ascSort"
              type="checkbox"
              checked={this.state.ascSort}
              onChange={this.handleChange} />
          </div>
        </form>
      </div>
    );
  }
}

export default SortForm;
