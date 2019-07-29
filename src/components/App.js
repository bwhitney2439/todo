import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoList from "./todoList";

class App extends Component {
  state = {
    todoItems: []
  };

  renderTodos() {
    if (this.state.todoItems === 0) {
      return null;
    }

    return (
      <TodoList
        onTodoDelete={this.onTodoDelete}
        todoItems={this.state.todoItems}
      />
    );
  }

  onFormSubmit = todoItem => {
    const todoItems = [...this.state.todoItems, todoItem];
    this.setState({ todoItems });
  };

  onTodoDelete = todoItem => {
    const todoItems = [...this.state.todoItems];
    const result = todoItems.filter(Item => Item !== todoItem);

    this.setState({ todoItems: result });
  };

  render() {
    return (
      <div className="ui container center aligned">
        <h1 className="ui header">todos</h1>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        {this.renderTodos()}
      </div>
    );
  }
}

export default App;
