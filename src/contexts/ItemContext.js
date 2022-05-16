import { createContext, useState } from "react";

const ItemContext = createContext();

export function ItemProvider({ children }) {
  return <ItemContext.Provider value={{}}>{children}</ItemContext.Provider>;
}

export default ItemContext;
