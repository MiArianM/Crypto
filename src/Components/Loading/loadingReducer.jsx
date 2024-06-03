export const initialState = { isLoading: true, tasks: {} };
export const loadingReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING": {
      return {
        ...state,
        isLoading: true,
        tasks: { ...state.tasks, [action.task]: true },
      };
    }
    case "STOP_LOADING": {
      const updatedTasks = { ...state.tasks };
      delete updatedTasks[action.task];
      return {
        ...state,
        isLoading: Object.keys(updatedTasks).length > 0,
        tasks: updatedTasks,
      };
    }
    default:
      return state;
  }
};
