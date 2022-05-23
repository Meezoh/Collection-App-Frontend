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

  const [signIn, updateSignIn] = useState(true);
  const setSignIn = (signin) => {
    updateSignIn(signin);
  };

  const [signOut, updateSignOut] = useState(false);
  const setSignOut = (signout) => {
    updateSignOut(signout);
  };
  const [showCollection, updateShowCollection] = useState(false);
  const setShowCollection = (collection) => {
    updateShowCollection(collection);
  };

  // const [kollection, updateKollection] = useState(Object);
  // const setKollection = (collection) => {
  //   updateKollection(collection);
  // };

  const contexts = {
    userId,
    setUserId,
    kollectionId,
    setKollectionId,
    signIn,
    setSignIn,
    signOut,
    setSignOut,
    showCollection,
    setShowCollection,
    // kollection,
    // setKollection,
  };

  return (
    <GlobalContext.Provider value={contexts}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContext;
