export const reduceReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((state, reducer) => reducer(state, action), state);

//High order reducer
const initialFetching = { loading: "idle", error: null };

export const makeFetchingReducer =
  (actions) =>
  (state = initialFetching, action) => {
    switch (action.type) {
      case actions[0]:
        return { ...state, loading: "pending", error: null };
      case actions[1]:
        return { ...state, loading: "succeded", error: null };
      case actions[2]:
        return { loading: "rejected", error: action.error };
      default:
        return state;
    }
  };
export const makeSetReducer =
  (actions) =>
  (state = "all", action) => {
    switch (action.type) {
      case actions[0]:
        return action.payload;
      default:
        return state;
    }
  };

export const makeCrudReducer =
  (actions) =>
  (state = [], action) => {
    switch (action.type) {
      case actions[0]: {
        return state.concat({ ...action.payload });
      }
      case actions[1]: {
        const newEntities = state.map((entity) => {
          if (entity.id === action.payload.id) {
            return { ...entity, completed: !entity.completed };
          }
          return entity;
        });
        return newEntities;
      }
      default:
        return state;
    }
  };
