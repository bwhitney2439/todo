import { useState, useEffect } from "react";

import firebase from "../config/firebase";

export const useTodos = authUser => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (authUser) {
      firebase
        .todos()
        // .where("userId", "==", authUser.uid)
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
          setTodos(data);
        });
    } else {
      setTodos([]);
    }
  }, [authUser]);

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

export const useAuth = () => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged(user => {
      setAuthUser(!!user);
    });

    return () => unregisterAuthObserver();
  }, [authUser]);

  return authUser;
};
