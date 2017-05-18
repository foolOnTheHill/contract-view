import React, { Component } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);

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
