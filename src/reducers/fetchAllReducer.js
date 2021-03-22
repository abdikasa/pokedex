export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload.filter((p) => p !== null);
    default:
      return state;
  }
};
