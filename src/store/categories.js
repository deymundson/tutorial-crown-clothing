import { createSelector } from "reselect";

const CATEGORY_ACTION_TYPES = {
  SET_CATEGORIES: "SET_CATEGORIES",
};

const INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};

export const setCategories = (categories) => ({
  type: CATEGORY_ACTION_TYPES.SET_CATEGORIES,
  payload: categories,
});

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
