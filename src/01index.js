import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./App";

const store = createStore((state = 0, action) => {
  //Esta funcion es un reducer
  switch (action.type) {
    case "accion": {
      return action.payload;
    }
    case "incrementar": {
      return state + 1;
    }
    case "decrementar": {
      return state - 1;
    }
    case "set": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
});

store.dispatch({ type: "accion", payload: 2 });
store.dispatch({ type: "incrementar" });
store.dispatch({ type: "decrementar" });
console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
