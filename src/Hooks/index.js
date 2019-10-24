import { useState, useEffect } from "react";
import firebase from "../config/firebase";

export const useTodos = authUser => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let unsubscribe = () => null;
    if (!!authUser) {
      unsubscribe = firebase
        .todos()
        .where("userId", "==", authUser.uid)
        .onSnapshot(snapshot => {
          const newTodos = snapshot.docs.map(todo => {
            return { id: todo.id, ...todo.data() };
          });
          setTodos(newTodos);
        });
    } else {
      setTodos([]);
    }
    return () => unsubscribe();
  }, [authUser]);

  console.log("useTodos is loading");

  const addTodo = (content, authUser) => {
    firebase.todos().add({ completed: false, content, userId: authUser.uid });
  };

  const toggleTodo = todo => {
    firebase.todo(todo.id).update({ completed: !todo.completed });
  };

  const toggleAllTodos = toggleAll => {
    todos.forEach(todo => {
      firebase.todo(todo.id).update({ completed: toggleAll });
    });
  };

  const editTodo = (id, content) => {
    firebase.todo(id).update({ content: content });
  };

  const deleteTodo = id => {
    firebase.todo(id).delete();
  };

  const clearTodos = () => {
    todos
      .filter(todo => todo.completed === true)
      .forEach(todo => {
        firebase.todo(todo.id).delete();
      });
  };

  return {
    addTodo,
    todos,
    toggleTodo,
    toggleAllTodos,
    editTodo,
    deleteTodo,
    clearTodos
  };
};

// export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
//   const { authUser } = useContext(TodoContext);

//   return (
//     <Route
//       {...rest}
//       render={routeProps =>
//         !!authUser ? (
//           <RouteComponent {...routeProps} />
//         ) : (
//           <Redirect to={"/login"} />
//         )
//       }
//     />
//   );
// };
