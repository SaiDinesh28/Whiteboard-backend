import { createContext } from "react";

const boardContext = createContext({
  activeItem: "",
  elements: [],
  history: [[]],
  index: 0,
  toolActionType: "NONE",
  handlesetactiveItem: () => {},
  handleMouseDownBoard: () => {},
  handleMouseMoveBoard: () => {},
  handleMouseUpBoard: () => {},
  handleonBlurBoard: () => {},
  undo: () => {},
  redo: () => {},
});

export default boardContext;
