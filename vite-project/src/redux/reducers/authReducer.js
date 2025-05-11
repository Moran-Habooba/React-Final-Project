import { v4 as uuidv4 } from "uuid";

const storedUsers = JSON.parse(localStorage.getItem("users")) || [
  {
    id: "1",
    userName: "Admin",
    password: "123456",
    role: "admin",
    firstName: "System",
    lastName: "Admin",
    joinedAt: "2025-05-01",
  },
  {
    id: "2",
    userName: "moran",
    password: "123123",
    role: "customer",
    firstName: "מורן",
    lastName: "חבובה",
    joinedAt: "2025-04-11",
  },
];

const initialState = {
  users: storedUsers,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      const { userName, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.userName === userName && user.password === password
      );

      if (foundUser) {
        return {
          ...state,
          currentUser: foundUser,
          error: null,
        };
      } else {
        return {
          ...state,
          error: "Incorrect username or password",
        };
      }
    }

    case "REGISTER": {
      const { firstName, lastName, userName, password, showOrdersToOthers } =
        action.payload;

      const existingUser = state.users.find(
        (user) => user.userName === userName
      );

      const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        userName,
        password,
        role: "customer",
        showOrdersToOthers,
        joinedAt: new Date().toISOString(),
      };

      if (!existingUser) {
        const updatedUsers = [...state.users, newUser];

        return {
          ...state,
          users: [...state.users, newUser],
          currentUser: newUser,
        };
      } else {
        return {
          ...state,
          error: "User already exists, Try Again",
        };
      }
    }

    case "UPDATE_USER": {
      const updatedUser = action.payload;

      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );

      return {
        ...state,
        users: updatedUsers,
        currentUser: { ...state.currentUser, ...updatedUser },
      };
    }

    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
