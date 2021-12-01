import React, { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { User as FirAuthUser } from "firebase/auth";
import AuthStore from "../stores/auth.store";

export const AuthProvider: React.FC = ({ children }) => {
  const authStore = AuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (firUser: FirAuthUser | null) => {
        authStore.onAuthStateChange(firUser);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};
