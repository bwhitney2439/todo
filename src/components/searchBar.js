import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onFormSubmit(this.state.term);

    this.setState({ term: "" });
  };

  handleChange = event => {
    this.setState({ term: event.target.value });
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.onFormSubmit}>
        <div className="field ui massive icon input">
          <input
            type="text"
            placeholder="what needs to be done?"
            value={this.state.term}
            onChange={this.handleChange}
          />
          <i className="search icon" />
        </div>
      </form>
    );
  }
}

export default SearchBar;
