import { createContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [role, updateRole] = useState(null);
  const setRole = (role) => {
    updateRole(role);
  };

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

  const [showAdmin, updateShowAdmin] = useState(false);
  const setShowAdmin = (user) => {
    updateShowAdmin(user);
  };

  const contexts = {
    role,
    setRole,
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
    showAdmin,
    setShowAdmin,
  };

  return (
    <GlobalContext.Provider value={contexts}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContext;
