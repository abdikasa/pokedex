export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_BIO":
      return action.payload;
    default:
      return state;
  }
};
