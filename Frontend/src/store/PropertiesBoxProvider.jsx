import { COLORS } from "../constants";
import propertiesContext from "./properties-box-context";

import React, { useReducer } from "react";

const propertiesBoxReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_STROKE": {
      let newState = { ...state };
      newState[action.payload.tool].stroke = action.payload.color;
      return newState;
    }
    case "CHANGE_FILL": {
      let newState = { ...state };
      newState[action.payload.tool].fill = action.payload.color;
      return newState;
    }
    case "CHANGE_SIZE": {
      let newState = { ...state };
      newState[action.payload.tool].size = action.payload.size;
      return newState;
    }
    default:
      return state;
  }
};

const initialpropertiesBoxState = {
  LINE: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  RECTANGLE: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  CIRCLE: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  ARROW: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  BRUSH: {
    stroke: COLORS.BLACK,
  },
  TEXT: {
    stroke: COLORS.BLACK,
    size: 32,
  },
};

const PropertiesBoxProvider = ({ children }) => {
  const [propertiesBoxState, dispatchpropertiesBoxAction] = useReducer(
    propertiesBoxReducer,
    initialpropertiesBoxState
  );

  const changeStrokePropertiesBox = (activeItem, color) => {
    dispatchpropertiesBoxAction({
      type: "CHANGE_STROKE",
      payload: {
        tool: activeItem,
        color,
      },
    });
  };
  const changeFillPropertiesBox = (activeItem, color) => {
    dispatchpropertiesBoxAction({
      type: "CHANGE_FILL",
      payload: {
        tool: activeItem,
        color,
      },
    });
  };
  const changeSizePropertiesBox = (activeItem, size) => {
    dispatchpropertiesBoxAction({
      type: "CHANGE_SIZE",
      payload: {
        tool: activeItem,
        size,
      },
    });
  };
  const propertiesBoxValue = {
    propertiesBoxState,
    handlechangeStroke: changeStrokePropertiesBox,
    handlechangeFill: changeFillPropertiesBox,
    handlechangeSize: changeSizePropertiesBox,
  };
  return (
    <propertiesContext.Provider value={propertiesBoxValue}>
      {children}
    </propertiesContext.Provider>
  );
};

export default PropertiesBoxProvider;
