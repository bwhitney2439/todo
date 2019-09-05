import React, { Component } from "react";
import AddTodo from "./addTodo";
import TodoItem from "./todoItem";
import NavBar from "./navBar";
import Footer from "./footer";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

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
  console.log(state);
  return {
    todos: state.firestore.ordered.todos || [],
    activeFilter: state.activeFilter
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todos" }])
)(App);
