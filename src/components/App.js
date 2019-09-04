import React, { Component } from "react";
import AddTodo from "./addTodo";
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
      return <TodoItem key={todoItem.id} todoItem={todoItem} />;
    });

    return {
      filteredTodos: renderedTodos,
      filteredTodosCount: renderedTodos.length
    };
  }

  render() {
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
        <header>
          <NavBar
            user={user}
            signOut={signOut}
            signInWithGithub={signInWithGithub}
          />
          <h1 style={{ textAlign: "center" }}>todo</h1>
        </header>
        <div className="container">
          <AddTodo todos={todos} activeTodoCount={activeTodoCount} />
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
