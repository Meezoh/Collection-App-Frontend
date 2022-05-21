import { createContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [userId, updateUserId] = useState(null);
  const setUserId = (id) => {
    updateUserId(id);
  };

  const [kollectionId, updateKollectionId] = useState(null);
  const setKollectionId = (id) => {
    updateKollectionId(id);
  };

  const [kollection, updateKollection] = useState(Object);
  const setKollection = (collection) => {
    updateKollection(collection);
  };

  const contexts = {
    userId,
    setUserId,
    kollectionId,
    setKollectionId,
    kollection,
    setKollection,
  };

  return (
    <GlobalContext.Provider value={contexts}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContext;
