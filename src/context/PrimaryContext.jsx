import React, { createContext, useReducer } from "react";

const initialState = {
  isCityUp: false,
  selectedCity: null,
  shouldUpdate: false,
};

const primaryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CITY_UP":
      return { ...state, isCityUp: action.payload };

    case "SELECT_CITY":
      return { ...state, selectedCity: action.payload };

    case "RESET_CITY_POS":
      const city = state.selectedCity;

      city.position.x = 0;
      city.position.y = 0;
      city.position.z = 0;

      return { ...state, selectedCity: city };

    default:
      return state;
  }
};

export const PrimaryContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const PrimaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(primaryReducer, initialState);

  return <PrimaryContext.Provider value={{ state, dispatch }}>{children}</PrimaryContext.Provider>;
};

export default PrimaryProvider;
