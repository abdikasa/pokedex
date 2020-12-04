export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_EVOLUTION":
      return action.payload;
    default:
      return state;
  }
};
