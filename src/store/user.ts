import {
  Action,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { takeLatest, put, all, call } from "typed-redux-saga";
import { createSelector } from "reselect";
import { RootState } from "./store";
import * as firebase from "../backend/firebase";

type User = {
  id: string;
  displayName: string;
  email: string;
};

type UserState = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOutSuccess: (state) => {
      state.user = null;
    },
    signInFailure: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    signUpFailure: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    signOutFailure: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const checkUserSession = createAction("user/checkUserSession");
export const googleSignInStart = createAction("user/googleSignInStart");
export const emailSignInStart = createAction(
  "user/emailSignInStart",
  (email, password) => ({ payload: { email, password } })
);
export const signUpStart = createAction(
  "user/signUpStart",
  (email, password, displayName) => ({
    payload: { email, password, displayName },
  })
);
export const signOutStart = createAction("user/signOutStart");
const signUpSuccess = createAction(
  "user/signUpSuccess",
  (userAuth, additionalInformation) => ({
    payload: { userAuth, additionalInformation },
  })
);

export const selectUser = createSelector(
  [(state: RootState) => state.user],
  (userSlice) => userSlice.user
);

function* getUserFromAuth(
  userAuth: firebase.User,
  additionalInformation?: firebase.AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      firebase.createUserFromAuth,
      userAuth,
      additionalInformation
    );
    const { displayName, email } = userSnapshot.data();
    yield* put(
      userSlice.actions.signInSuccess({
        id: userSnapshot.id,
        displayName,
        email,
      })
    );
  } catch (error) {
    yield* put(userSlice.actions.signInFailure(error as Error));
  }
}

function* isUserAuthenticated() {
  try {
    const user = yield* call(firebase.getCurrentUserAuth);
    if (!user) return;
    yield* call(getUserFromAuth, user);
  } catch (error) {
    yield* put(userSlice.actions.signInFailure(error as Error));
  }
}

function* signInWithEmail(action: Action) {
  if (!emailSignInStart.match(action)) throw new Error("Invalid action");
  const { email, password } = action.payload;
  try {
    const { user } = yield* call(firebase.signInWithEmail, email, password);
    yield* call(getUserFromAuth, user);
  } catch (error) {
    yield* put(userSlice.actions.signInFailure(error as Error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(firebase.signInWithGooglePopup);
    yield* call(getUserFromAuth, user);
  } catch (error) {
    yield* put(userSlice.actions.signInFailure(error as Error));
  }
}

function* signUp(action: Action) {
  if (!signUpStart.match(action)) throw new Error("Invalid action");
  const { email, password, displayName } = action.payload;
  try {
    const { user } = yield* call(
      firebase.createUserAuthFromEmail,
      email,
      password
    );
    yield* put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield* put(userSlice.actions.signUpFailure(error as Error));
  }
}

function* signInAfterSignUp(action: Action) {
  if (!signUpSuccess.match(action)) throw new Error("Invalid action");
  const { userAuth, additionalInformation } = action.payload;
  yield* call(getUserFromAuth, userAuth, additionalInformation);
}

function* signOut() {
  try {
    yield* call(firebase.signOutUser);
    yield* put(userSlice.actions.signOutSuccess());
  } catch (error) {
    yield* put(userSlice.actions.signOutFailure(error as Error));
  }
}

function* onCheckUserSession() {
  yield* takeLatest(checkUserSession.type, isUserAuthenticated);
}

function* onEmailSignInStart() {
  yield* takeLatest(emailSignInStart.type, signInWithEmail);
}

function* onGoogleSignInStart() {
  yield* takeLatest(googleSignInStart.type, signInWithGoogle);
}

function* onSignUpStart() {
  yield* takeLatest(signUpStart.type, signUp);
}

function* onSignUpSuccess() {
  yield* takeLatest(signUpSuccess.type, signInAfterSignUp);
}

function* onSignOutStart() {
  yield* takeLatest(signOutStart.type, signOut);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
