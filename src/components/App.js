import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoItem from "./todoItem";
class App extends Component {
  state = {
    todoItems: [
      { id: 1, content: "make tea", completed: false },
      { id: 2, content: "eat chocolate", completed: false }
    ],
    editing: false,
    toggleAll: false,
    activeTodoCount: null
  };

  componentDidMount() {
    const activeTodoCount = this.state.todoItems.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    this.setState({ activeTodoCount });
  }

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
    todoItems[index].completed = !todoItems[index].completed;

    const activeTodoCount = todoItems.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    this.setState({ todoItems, activeTodoCount });

    if (todoItems[index].completed === false) {
      this.setState({ toggleAll: false });
    } else if (activeTodoCount === 0) {
      this.setState({ toggleAll: true });
    }
  };

  toggleAllComplete = () => {
    const toggleAll = !this.state.toggleAll;
    const todoItems = this.state.todoItems.map(todo => {
      if (toggleAll !== todo.completed) {
        todo.completed = !todo.completed;
        return todo;
      } else {
        return todo;
      }
    });

    this.setState({ todoItems, toggleAll });
  };

  toggleEdit = todoItem => {
    this.setState({ editing: todoItem.id });
  };

  cancelEdit = () => {
    console.log("cancelEdit");
    this.setState({ editing: null });
  };

  editTodoItem = (content, todoItem) => {
    const todoItems = [...this.state.todoItems];
    const index = todoItems.indexOf(todoItem);
    todoItems[index].content = content;

    this.setState({ todoItems, editing: null });
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
          editTodoItem={this.editTodoItem}
          cancelEdit={this.cancelEdit}
          editing={this.state.editing === todoItem.id}
        />
      );
    });

    return renderedTodos;
  }

  render() {
    console.log(this.state.toggleAll);
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
          activeTodoCount={this.state.activeTodoCount}
        />
        {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
