import configureStore from 'redux-mock-store';

const getStore = (initialState) => {
  const mockStore = configureStore();
  return mockStore(initialState);
};

export { getStore };
