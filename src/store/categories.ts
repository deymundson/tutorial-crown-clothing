import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, all, call, put } from "typed-redux-saga";
import { createSelector } from "reselect";
import { RootState } from "./store";
import { getCategoriesAndDocuments } from "../backend/firebase";

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  items: CategoryItem[];
};

type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
};

export const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  fetchCategoriesStart,
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
} = categoriesSlice.actions;

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCategoriesAndDocuments);
    yield* put(categoriesSlice.actions.fetchCategoriesSuccess(categories));
  } catch (error) {
    yield* put(categoriesSlice.actions.fetchCategoriesFailure(error as Error));
  }
}

export function* onFetchCategoriesStart() {
  yield* takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategoriesStart)]);
}

export const selectCategories = createSelector(
  [(state: RootState) => state.categories],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesByTitle = createSelector(
  selectCategories,
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as { [key: string]: CategoryItem[] })
);

export const selectCategoriesLoading = createSelector(
  [(state: RootState) => state.categories],
  (categoriesSlice) => categoriesSlice.isLoading
);
