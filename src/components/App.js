import React, { Component } from "react";
import SearchBar from "./searchBar";
import TodoItem from "./todoItem";
import NavBar from "./navBar";
import Footer from "./footer";
// import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import fbConfig from "../config/fbConfig";
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
    editing: false
  };

  componentDidMount() {
    const store = require("store");
    const todoItems = store.get("todoItems") ? store.get("todoItems") : [];
    const toggleAll = store.get("toggleAll");

    this.setState({ todoItems, toggleAll });
  }

  toggleEdit = todoItem => {
    this.setState({ editing: todoItem.id });
  };

  cancelEdit = () => {
    this.setState({ editing: null });
  };

  editTodoItem = (content, todoItem) => {
    const todoItems = [...this.state.todoItems];
    const index = todoItems.indexOf(todoItem);
    todoItems[index].content = content;

    const store = require("store");
    store.set("todoItems", todoItems);

    this.setState({ todoItems, editing: null });
  };

  renderTodoList(todos) {
    const { activeFilter } = this.props.activeFilter;
    const filteredTodos = todos.filter(todo => {
      switch (activeFilter) {
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

  render() {
    // console.log(this.props);
    const { todos, user, signOut, signInWithGithub } = this.props;
    const { length: totalTodosCount } = this.props.todos;
    const { activeFilter } = this.props.activeFilter;

    const activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedTodoCount = totalTodosCount - activeTodoCount;

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
          <SearchBar todos={todos} activeTodoCount={activeTodoCount} />
          {filteredTodos}
          <Footer
            activeFilter={activeFilter}
            completedTodoCount={completedTodoCount}
            filteredTodosCount={filteredTodosCount}
            totalTodosCount={totalTodosCount}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    activeFilter: state.activeFilter
  };
};
export default connect(mapStateToProps)(App);
