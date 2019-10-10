import { useState, useEffect } from "react";

import firebase from "../config/firebase";

export const useTodos = () => {
  const [authUser, setAuthUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        firebase
          .todos()
          .where("userId", "==", user.uid)
          .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
              return { id: doc.id, ...doc.data() };
            });
            setTodos(data);
          });
      } else {
        setTodos([]);
      }
      setAuthUser(user);
      console.log(authUser);
    });

    return () => unregisterAuthObserver();
  }, [authUser]);

  const addTodo = content => {
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
    authUser,
    addTodo,
    todos,
    toggleTodo,
    toggleAllTodos,
    editTodo,
    deleteTodo,
    clearTodos
  };
};
