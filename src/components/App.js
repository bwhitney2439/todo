import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoItem from "./todoItem";
import NavBar from "./navBar";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import fbConfig from "../config/fbConfig";

import { connect } from "react-redux";

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(fbConfig);
// // firebase.firestore().settings({ timestampsInSnapshots: true });

// const firebaseAppAuth = firebaseApp.auth();
// const providers = {
//   githubProvider: new firebase.auth.GithubAuthProvider()
// };

class App extends Component {
  state = {
    todoItems: [],
    editing: false,
    toggleAll: false,
    activeFilter: "All"
  };

  componentDidMount() {
    const store = require("store");
    const todoItems = store.get("todoItems") ? store.get("todoItems") : [];
    const toggleAll = store.get("toggleAll");

    this.setState({ todoItems, toggleAll });
  }

  addTodoItem = todoItem => {
    todoItem.id = Math.random();
    todoItem.completed = false;
    const store = require("store");
    const todoItems = [...this.state.todoItems, todoItem];
    const toggleAll = this.state.toggleAll;
    if (toggleAll) {
      this.setState({ todoItems, toggleAll: false });
      store.set("todoItems", todoItems);
      store.set("toggleAll", { toggleAll: false });
    } else {
      this.setState({ todoItems });
      store.set("todoItems", todoItems);
    }
  };

  deleteTodoItem = todoItem => {
    const todoItems = this.state.todoItems.filter(item => item.id !== todoItem);
    const store = require("store");
    store.set("todoItems", todoItems);
    this.setState({ todoItems });
  };

  toggleComplete = todoItem => {
    const todoItems = [...this.state.todoItems];
    const index = todoItems.indexOf(todoItem);
    todoItems[index].completed = !todoItems[index].completed;

    const activeTodoCount = todoItems.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const store = require("store");

    if (activeTodoCount === 0) {
      store.set("todoItems", todoItems);
      store.set("toggleAll", { toggleAll: true });
      this.setState({ toggleAll: true, todoItems });
    } else if (todoItems[index].completed === false) {
      store.set("todoItems", todoItems);
      store.set("toggleAll", { toggleAll: false });
      this.setState({ toggleAll: false, todoItems });
    } else {
      store.set("todoItems", todoItems);
      this.setState({ todoItems });
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

    const store = require("store");
    store.set("todoItems", todoItems);
    store.set("toggleAll", toggleAll);

    this.setState({ todoItems, toggleAll });
  };

  toggleEdit = todoItem => {
    this.setState({ editing: todoItem.id });
  };

  cancelEdit = () => {
    this.setState({ editing: null });
  };

  clearTodoItems = () => {
    const todoItems = this.state.todoItems.filter(todo => !todo.completed);

    const store = require("store");
    store.set("todoItems", todoItems);

    this.setState({ todoItems });
  };

  editTodoItem = (content, todoItem) => {
    const todoItems = [...this.state.todoItems];
    const index = todoItems.indexOf(todoItem);
    todoItems[index].content = content;

    const store = require("store");
    store.set("todoItems", todoItems);

    this.setState({ todoItems, editing: null });
  };

  filterTodoItems = filter => {
    this.setState({ activeFilter: filter });
  };

  renderTodoList(todos) {
    const filteredTodos = todos.filter(todo => {
      switch (this.state.activeFilter) {
        case "Active":
          return !todo.completed;
        case "Completed":
          return todo.completed;
        default:
          return true;
      }
    });
    const renderedTodos = filteredTodos.map(todoItem => {
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

    return {
      filteredTodos: renderedTodos,
      filteredTodosCount: renderedTodos.length
    };
  }

  renderFooter(filteredTodosCount, activeTodoCount) {
    const { activeFilter } = this.state;
    const { length: totalTodosCount } = this.state.todoItems;

    const completedTodoCount = totalTodosCount - activeTodoCount;

    if (!totalTodosCount) {
      return null;
    } else {
      return (
        <div className="filter">
          <label>{filteredTodosCount} items</label>
          <div className="filter-button-container">
            <button
              className={activeFilter === "All" ? "selected" : ""}
              onClick={() => this.filterTodoItems("All")}
            >
              All
            </button>
            <button
              className={activeFilter === "Active" ? "selected" : ""}
              onClick={() => this.filterTodoItems("Active")}
            >
              Active
            </button>
            <button
              className={activeFilter === "Completed" ? "selected" : ""}
              onClick={() => this.filterTodoItems("Completed")}
            >
              Completed
            </button>
          </div>
          <label
            className={completedTodoCount ? "" : "hide-clear-completed"}
            onClick={this.clearTodoItems}
          >
            Clear Completed
          </label>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    const { todos, user, signOut, signInWithGithub } = this.props;

    const activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const { filteredTodos, filteredTodosCount } = this.renderTodoList(todos);

    return (
      <React.Fragment>
        <NavBar
          user={user}
          signOut={signOut}
          signInWithGithub={signInWithGithub}
        />
        <div className="container">
          <header>
            <h1>todo</h1>
          </header>
          <SearchBar
            addTodoItem={this.addTodoItem}
            toggleAllComplete={this.toggleAllComplete}
            todoItems={todos}
            toggleAll={this.state.toggleAll}
            activeTodoCount={activeTodoCount}
          />
          {filteredTodos}
          {this.renderFooter(filteredTodosCount, activeTodoCount)}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos
  };
};
export default connect(mapStateToProps)(App);
