const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")) || [
    "Smartphones",
    "Clothing",
    "Computers and tablets",
  ],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY": {
      const updated = [...state.categories, action.payload];
      return {
        ...state,
        categories: updated,
      };
    }

    case "UPDATE_CATEGORY": {
      const { index, name } = action.payload;

      const updated = [...state.categories];
      updated[index] = name;

      return {
        ...state,
        categories: updated,
      };
    }

    case "DELETE_CATEGORY": {
      const updatedCategories = state.categories.filter(
        (_, index) => index !== action.payload
      );

      return {
        ...state,
        categories: updatedCategories,
      };
    }

    default:
      return state;
  }
};
export default categoriesReducer;
