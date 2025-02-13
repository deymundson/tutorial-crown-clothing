import { takeLatest, put, all, call } from "redux-saga/effects";
import * as firebase from "../backend/firebase";

const USER_ACTION_TYPES = {
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
  SIGN_UP_START: "SIGN_UP_START",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_FAILURE: "SIGN_UP_FAILURE",
  SIGN_OUT_START: "SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILURE: "SIGN_OUT_FAILURE",
};

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, user: payload };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, user: null };
    case USER_ACTION_TYPES.SIGN_IN_FAILURE:
    case USER_ACTION_TYPES.SIGN_UP_FAILURE:
    case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export const checkUserSession = () => ({
  type: USER_ACTION_TYPES.CHECK_USER_SESSION,
});

export const googleSignInStart = () => ({
  type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (email, password) => ({
  type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  payload: { email, password },
});

export const signUpStart = (email, password, displayName) => ({
  type: USER_ACTION_TYPES.SIGN_UP_START,
  payload: { email, password, displayName },
});

export const signOutStart = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_START,
});

const signInSuccess = (user) => ({
  type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: user,
});

const signInFailure = (error) => ({
  type: USER_ACTION_TYPES.SIGN_IN_FAILURE,
  payload: error,
});

const signUpSuccess = (userAuth, additionalInformation) => ({
  type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  payload: { userAuth, additionalInformation },
});

const signUpFailure = (error) => ({
  type: USER_ACTION_TYPES.SIGN_UP_FAILURE,
  payload: error,
});
const signOutSuccess = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
});

const signOutFailure = (error) => ({
  type: USER_ACTION_TYPES.SIGN_OUT_FAILURE,
  payload: error,
});

export const selectUser = (state) => state.user.user;

function* getUserFromAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(
      firebase.createUserFromAuth,
      userAuth,
      additionalInformation
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* isUserAuthenticated() {
  try {
    const user = yield call(firebase.getCurrentUserAuth);
    if (!user) return;
    yield call(getUserFromAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithEmail(action) {
  const { email, password } = action.payload;
  try {
    const { user } = yield call(firebase.signInWithEmail, email, password);
    yield call(getUserFromAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(firebase.signInWithGooglePopup);
    yield call(getUserFromAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signUp(action) {
  const { email, password, displayName } = action.payload;
  try {
    const { user } = yield call(
      firebase.createUserAuthFromEmail,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* signInAfterSignUp(action) {
  const { userAuth, additionalInformation } = action.payload;
  yield call(getUserFromAuth, userAuth, additionalInformation);
}

function* signOut() {
  try {
    yield call(firebase.signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
