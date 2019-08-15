import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoItem from "./todoItem";
class App extends Component {
  state = {
    todoItems: [
      { id: 1, content: "make tea", completed: false, edit: false },
      { id: 2, content: "eat chocolate", completed: false, edit: false }
    ],
    toggleAll: false,
    activeTodoCount: 0
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
    // todoItems[index] = { ...todoItems[index] };
    todoItems[index].completed = !todoItems[index].completed;

    const toggleAll = this.state.toggleAll;
    if (toggleAll) {
      this.setState({
        todoItems,
        toggleAll: false
      });
    } else {
      this.setState({ todoItems });
    }
  };

  toggleAllComplete = () => {
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
    this.setState({ todoItems, toggleAll });
  };

  toggleEdit = todoItem => {
    const todoItems = [...this.state.todoItems];
    const index = todoItems.indexOf(todoItem);
    todoItems[index].edit = !todoItems[index].edit;

    this.setState({ todoItems });

    console.log(this.state.todoItems);
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
          toggleEdit={this.toggleEdit}
        />
      );
    });

    return renderedTodos;
  }

  render() {
    const activeTodoCount = this.state.todoItems.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

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
          activeTodoCount={activeTodoCount}
        />
        {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
