import {
  categoriesReducer,
  fetchCategoriesFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  initialState,
  selectCategories,
  selectCategoriesByTitle,
  selectCategoriesLoading,
  fetchCategoriesAsync,
  onFetchCategoriesStart,
  categoriesSaga,
} from "./categories";
import { getCategoriesAndDocuments } from "../backend/firebase";

import { describe } from "vitest";
import { testSaga, expectSaga } from "redux-saga-test-plan";
import { call } from "typed-redux-saga";

describe("CategoriesReducer", () => {
  test("fetchCategoriesStart", () => {
    const state = categoriesReducer(initialState, fetchCategoriesStart());
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("fetchCategoriesSuccess", () => {
    const categories = [
      {
        title: "Mens",
        items: [
          {
            id: 1,
            name: "Product 1",
          },
          {
            id: 2,
            name: "Product 2",
          },
        ],
      },
    ];
    const state = categoriesReducer(
      initialState,
      fetchCategoriesSuccess(categories)
    );
    expect(state).toEqual({
      ...initialState,
      categories,
      isLoading: false,
    });
  });

  test("fetchCategoriesFailure", () => {
    const error = new Error("Error fetching categories");
    const state = categoriesReducer(
      initialState,
      fetchCategoriesFailure(error)
    );
    expect(state).toEqual({
      ...initialState,
      error,
      isLoading: false,
    });
  });
});

describe("CategorySelector", () => {
  const state = {
    categories: {
      categories: [
        {
          title: "Mens",
          items: [
            {
              id: 1,
              name: "Product 1",
            },
            {
              id: 2,
              name: "Product 2",
            },
          ],
        },
        {
          title: "Womens",
          items: [
            {
              id: 3,
              name: "Product 3",
            },
            {
              id: 4,
              name: "Product 4",
            },
          ],
        },
      ],
      isLoading: false,
    },
  };
  test("selectCategories", () => {
    const selected = selectCategories(state);
    expect(selected).toEqual(state.categories.categories);
  });
  test("selectCategoriesByTitle", () => {
    const selected = selectCategoriesByTitle(state);
    expect(selected).toEqual({
      mens: [
        {
          id: 1,
          name: "Product 1",
        },
        {
          id: 2,
          name: "Product 2",
        },
      ],
      womens: [
        {
          id: 3,
          name: "Product 3",
        },
        {
          id: 4,
          name: "Product 4",
        },
      ],
    });
  });
  test("selectCategoriesLoading", () => {
    const selected = selectCategoriesLoading(state);
    expect(selected).toEqual(state.categories.isLoading);
  });
});

describe("CategorySaga", () => {
  test("categoriesSaga", () => {
    testSaga(categoriesSaga)
      .next()
      // .all([call(onFetchCategoriesStart)])
      .next()
      .isDone();
  });
  test("onFetchCategoriesStart", () => {
    testSaga(onFetchCategoriesStart)
      .next()
      .takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync)
      .next()
      .isDone();
  });
  test("fetchCategoriesAsync success", async () => {
    const categories = [
      {
        id: 1,
        name: "Category 1",
      },
      {
        id: 2,
        name: "Category 2",
      },
    ];

    await expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), categories]])
      // .put(fetchCategoriesSuccess(categories))
      .run();
  });
});
