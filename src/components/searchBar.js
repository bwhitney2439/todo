import React from "react";

class SearchBar extends React.Component {
  state = { content: "" };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.content === "") {
      return null;
    }

    this.props.addTodoItem(this.state);

    this.setState({ content: "" });
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui massive icon input">
          <input
            type="text"
            placeholder="what needs to be done?"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <i className="search icon" />
        </div>
      </form>
    );
  }
}

export default SearchBar;
