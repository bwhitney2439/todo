import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoItem from "./todoItem";
class App extends Component {
  state = {
    todoItems: [
      { id: 1, content: "make tea", completed: false },
      { id: 2, content: "eat chocolate", completed: false }
    ],
    toggleAll: false
  };

  addTodoItem = todoItem => {
    todoItem.id = Math.random();
    todoItem.completed = false;
    const todoItems = [...this.state.todoItems, todoItem];
    const toggleAll = this.state.toggleAll;
    if (toggleAll) {
      this.setState({ todoItems, toggleAll: false });
    } else {
      this.setState({ todoItems });
    }
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

    const toggleAll = this.state.toggleAll;
    if (toggleAll || ![this.state.todoItems].every(x => x.completed === true)) {
      this.setState({ todoItems, toggleAll: false });
    } else {
      this.setState({ todoItems });
    }
  };

  toggleAllComplete = () => {
    const todoItems = [...this.state.todoItems];
    const toggleAll = !this.state.toggleAll;

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
    this.setState({ todoItems, toggleAll });
  };

  renderTodoList() {
    const renderedTodos = this.state.todoItems.map(todoItem => {
      return (
        <TodoItem
          key={todoItem.id}
          todoItem={todoItem}
          deleteTodoItem={this.deleteTodoItem}
          toggleComplete={this.toggleComplete}
          toggleAll={this.state.toggleAll}
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
          todoItems={this.state.todoItems}
          toggleAll={this.state.toggleAll}
        />
        {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
