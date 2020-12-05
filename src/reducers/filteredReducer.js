export default (state = [], action) => {
  switch (action.type) {
    case "SEARCHED":
      return action.payload;
    default:
      return state;
  }
};
