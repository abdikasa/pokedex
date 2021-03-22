export default (state = [], action) => {
  switch (action.type) {
    case "SEARCHED":
      return action.payload.filter((p) => p !== null);
    default:
      return state;
  }
};
