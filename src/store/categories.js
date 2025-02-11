import { createSelector } from "reselect";
import { getCategoriesAndDocuments } from "../backend/firebase";

const CATEGORY_ACTION_TYPES = {
  FETCH_CATEGORIES_START: "FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILURE: "FETCH_CATEGORIES_FAILURE",
};

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

const fetchCategoriesStart = () => ({
  type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
});

const fetchCategoriesSuccess = (categories) => ({
  type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

const fetchCategoriesFailure = (error) => ({
  type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

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
