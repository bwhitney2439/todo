import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoList from "./todoList";

class App extends Component {
  state = {
    todoItems: ["hello world", "hi there"]
  };

  renderTodos() {
    if (this.state.todoItems === 0) {
      return null;
    }

    return <TodoList todoItems={this.state.todoItems} />;
  }

  render() {
    return (
      <div className="ui container center aligned">
        <h1 className="ui header">todos</h1>
        <SearchBar />
        {this.renderTodos()}
      </div>
    );
  }
}

export default App;
