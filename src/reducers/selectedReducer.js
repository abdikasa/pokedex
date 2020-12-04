export default (state = {}, action) => {
  switch (action.type) {
    case "SELECTED":
      return action.payload;
    default:
      return state;
  }
};
