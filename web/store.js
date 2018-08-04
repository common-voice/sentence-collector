export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN = 'LOGIN';

const initialState = {
  authed: false,
};

export default function reducer(state, action) {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case ACTION_LOGOUT:
      return {
        authed: false,
      };

    case ACTION_LOGIN:
      return {
        authed: true,
      };

    default:
      return state;
  }
}

