import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setCompleted,
  fetchThunk,
  selectStatus,
  selectTodos,
} from "./features/todos";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li
      style={todo.completed ? { textDecoration: "line-through" } : {}}
      onClick={() => dispatch(setCompleted(todo))}
    >
      {todo.title}
    </li>
  );
};
const App = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    const id = Math.random().toString(36);
    const todo = {
      title: value,
      completed: false,
      id,
    };
    dispatch({ type: "ADD_TODO", payload: todo });
    setValue("");
  };

  if (status.loading === "pending") {
    return <div>Loading...</div>;
  }
  if (status.loading === "rejected") {
    return <div>{status.error}</div>;
  }
  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <button onClick={() => dispatch(setFilter("all"))}>Mostrar todo</button>
      <button onClick={() => dispatch(setFilter("complete"))}>
        Completados
      </button>
      <button onClick={() => dispatch(setFilter("incomplete"))}>
        Pendientes
      </button>
      <button onClick={() => dispatch(fetchThunk())}>fetch</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
