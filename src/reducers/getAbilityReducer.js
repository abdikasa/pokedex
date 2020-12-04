export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ABILITIES":
      return action.payload;
    default:
      return state;
  }
};
