const setFetching = ({ state, name, value }) => {
  if (name && (name in state) && ('isFetching' in state[name])) {
    state[name].isFetching = value;
  } else if ('isFetching' in state) {
    state.isFetching = value;
  }
};

export const FETCHING = (state, name) => {
  const value = true;

  setFetching({
    state,
    name,
    value,
  });
};

export const FETCHED = (state, name) => {
  const value = false;

  setFetching({
    state,
    name,
    value,
  });
};
