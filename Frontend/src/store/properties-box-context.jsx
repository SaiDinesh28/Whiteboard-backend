import { createContext } from "react";

const propertiesContext = createContext({
  propertiesBoxState: {},
  handlechangeStroke: () => {},
  handlechangeFill: () => {},
  handlechangeSize: () => {},
});

export default propertiesContext;
