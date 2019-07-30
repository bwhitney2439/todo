import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoList from "./todoList";

class App extends Component {
  state = {
    todoItems: []
  };

  addTodoItem = todoItem => {
    todoItem.id = Math.random();
    const todoItems = [...this.state.todoItems, todoItem];
    this.setState({ todoItems });
  };

  deleteTodoItem = todoItem => {
    const todoItems = [...this.state.todoItems];
    const result = todoItems.filter(Item => Item.id !== todoItem);

    this.setState({ todoItems: result });
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
