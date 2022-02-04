import { combineReducers } from "redux";
import {
  makeFetchingReducer,
  makeSetReducer,
  reduceReducers,
  makeCrudReducer,
} from "./utils";

//Action creators
export const setPending = () => {
  return {
    type: "todos/pending",
  };
};

export const setFulfilled = (payload) => ({
  type: "todos/fulfilled",
  payload,
});

export const setError = (e) => {
  return { type: "todos/rejected", error: e.message };
};

export const setCompleted = (payload) => {
  return {
    type: "COMPLETE_TODO",
    payload,
  };
};

export const setFilter = (payload) => {
  return { type: "filter", payload };
};

//Fetch thunk de API
export const fetchThunk = () => async (dispatch) => {
  dispatch(setPending());
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    const todos = data.slice(0, 10);
    dispatch(setFulfilled(todos));
  } catch (e) {
    dispatch(setError(e));
  }
};

//Reducers para filtrado
export const filterReducer = makeSetReducer(["filter"]);

export const fetchingReducer = makeFetchingReducer([
  "todos/pending",
  "todos/fulfilled",
  "todos/rejected",
]);

const fulfilledReducer = makeSetReducer(["todos/fulfilled"]);

const crudReducer = makeCrudReducer(["ADD_TODO", "COMPLETE_TODO"]);

export const todosReducer = reduceReducers(crudReducer, fulfilledReducer);

export const reducer = combineReducers({
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
});

//Selectors
export const selectStatus = (state) => state.todos.status;

export const selectTodos = (state) => {
  const {
    todos: { entities },
    filter,
  } = state;

  if (filter === "complete") {
    return entities.filter((todo) => todo.completed);
  } else if (filter === "incomplete") {
    return entities.filter((todo) => !todo.completed);
  }
  return entities;
};
