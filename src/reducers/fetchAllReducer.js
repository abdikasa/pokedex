export default (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    default:
      return state;
  }
};
