import React, { Component } from "react";
import SearchBar from "./searchBar";
// import TodoList from "./todoList";
import TodoItem from "./todoItem";
class App extends Component {
  state = {
    todoItems: [
      { id: 1, content: "make tea", completed: false },
      { id: 2, content: "eat chocolate", completed: false }
    ]
  };

  addTodoItem = todoItem => {
    todoItem.id = Math.random();
    todoItem.completed = false;
    const todoItems = [...this.state.todoItems, todoItem];
    this.setState({ todoItems });
  };

  deleteTodoItem = todoItem => {
    const todoItems = this.state.todoItems.filter(item => item.id !== todoItem);

    this.setState({ todoItems });
  };

  toggleComplete = todoItem => {
    const todoItems = [...this.state.todoItems];
    const index = todoItems.indexOf(todoItem);
    todoItems[index] = { ...todoItems[index] };
    todoItems[index].completed = !todoItems[index].completed;

    this.setState({ todoItems });
    console.log(this.state.todoItems[index].completed);
  };

  toggleAllComplete = toggleAll => {
    const todoItems = [...this.state.todoItems];
    if (toggleAll) {
      todoItems.map(todoItem => {
        todoItem.completed = true;
        return todoItem;
      });
    } else {
      todoItems.map(todoItem => {
        todoItem.completed = false;
        return todoItem;
      });
    }
    this.setState({ todoItems });
  };

  renderTodoList() {
    const renderedTodos = this.state.todoItems.map(todoItem => {
      return (
        <TodoItem
          key={todoItem.id}
          todoItem={todoItem}
          deleteTodoItem={this.deleteTodoItem}
          toggleComplete={this.toggleComplete}
        />
      );
    });

    return renderedTodos;
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>todo</h1>
        </header>

        <SearchBar
          addTodoItem={this.addTodoItem}
          toggleAllComplete={this.toggleAllComplete}
        />
        {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
