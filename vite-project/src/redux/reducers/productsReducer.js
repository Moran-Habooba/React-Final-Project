const storedProducts = JSON.parse(localStorage.getItem("products"));

const initialState = {
  products: storedProducts || [
    {
      productId: 3,
      name: "ipad",
      price: 1500,
      category: "Computers and tablets",
      quantity: 3,
      unitsSold: 0,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-card-40-ipad-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1727714411651",
      description: "iPad tablet with Retina display",
    },
    {
      productId: 4,
      name: "T-Shirt - Classic Fit",
      price: 99,
      category: "Clothing",
      quantity: 20,
      unitsSold: 0,
      image:
        "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726716_640.jpg",

      description: "100% cotton",
    },
    {
      productId: 5,
      name: "iPhone 14",
      price: 3500,
      category: "Smartphones",
      quantity: 5,
      unitsSold: 0,
      image:
        "https://www.apple.com/v/iphone/home/cb/images/overview/select/iphone_16__c5bvots96jee_xlarge.png",
      description: "Professional camera",
    },
  ],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const updatedProducts = [...state.products, action.payload];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return {
        ...state,
        products: updatedProducts,
      };
    }

    case "UPDATE_PRODUCT": {
      const updatedProducts = state.products.map((product) =>
        product.productId === action.payload.productId
          ? action.payload
          : product
      );

      return {
        ...state,
        products: updatedProducts,
      };
    }
    case "UPDATE_STOCK": {
      const { items, showOrdersToOthers } = action.payload;

      const updatedProducts = state.products.map((product) => {
        const ordered = items.find(
          (item) => item.productId === product.productId
        );
        if (!ordered) return product;

        return {
          ...product,
          quantity: product.quantity - ordered.quantity,
          unitsSold: showOrdersToOthers
            ? product.unitsSold + ordered.quantity
            : product.unitsSold,
        };
      });

      return {
        ...state,
        products: updatedProducts,
      };
    }

    case "DELETE_PRODUCT":
      const updatedProducts = state.products.filter(
        (product) => product.productId !== action.payload
      );

      return {
        ...state,
        products: updatedProducts,
      };

    default:
      return state;
  }
};
export default productsReducer;
