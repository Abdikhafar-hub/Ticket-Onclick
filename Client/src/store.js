import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage
import { combineReducers } from "redux";

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "CLEAR_DATA":
      return {}; // Return the initial state to clear the data
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
