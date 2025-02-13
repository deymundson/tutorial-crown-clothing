import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../backend/firebase";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchCategoriesStart: (state) => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    fetchCategoriesFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { fetchCategoriesStart } = categoriesSlice.actions;

function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments);
    yield put(categoriesSlice.actions.fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(categoriesSlice.actions.fetchCategoriesFailure(error.message));
  }
}

function* onFetchCategoriesStart() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategoriesStart)]);
}

const selectCategories = createSelector(
  (state) => state.categories,
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesByTitle = createSelector(
  selectCategories,
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase(0)] = items;
      return acc;
    }, {})
);

export const selectCategoriesLoading = createSelector(
  (state) => state.categories,
  (categoriesSlice) => categoriesSlice.isLoading
);
