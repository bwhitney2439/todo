import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoList from "./todoList";

class App extends Component {
  state = {
    todoItems: [
      { id: 1, content: "make tea" },
      { id: 2, content: "eat chocolate" }
    ]
  };

  addTodoItem = todoItem => {
    todoItem.id = Math.random();
    const todoItems = [...this.state.todoItems, todoItem];
    this.setState({ todoItems });
  };

  deleteTodoItem = todoItem => {
    const todoItems = this.state.todoItems.filter(item => item.id !== todoItem);

    this.setState({ todoItems });
  };

  render() {
    return (
      <div className="ui container center aligned">
        <h1 className="ui header">todos</h1>
        <SearchBar addTodoItem={this.addTodoItem} />
        <TodoList
          todoItems={this.state.todoItems}
          deleteTodoItem={this.deleteTodoItem}
        />
      </div>
    );
  }
}

export default App;
