const USER_ACTION_TYPES = {
  SET_USER: "SET_USER",
};

const INITIAL_STATE = {
  user: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: USER_ACTION_TYPES.SET_USER,
  payload: user,
});

export const selectUser = (state) => state.user.user;
