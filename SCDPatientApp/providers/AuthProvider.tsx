import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth, db } from "../firebase";
import { User as FirAuthUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { TUser } from "../models/User";

export const AuthProvider: React.FC = ({ children }) => {
  // firebase.User: user is signed in
  // null: user is not signed in
  // undefined: we don't know if the user is signed in or not
  const [user, setUser] = useState<TUser | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (firebaseUser: FirAuthUser | null) => {
        console.log("auth change", firebaseUser);
        if (firebaseUser) {
          const docRef = doc(db, "users", firebaseUser!.uid);
          const docSnap = await getDoc(docRef);
          let user: TUser;
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            user = docSnap.data() as TUser;
            // user = { uid: firebaseUser.uid, ...docSnap.data() } as TUser;
          } else {
            user = { uid: firebaseUser.uid } as TUser;
          }
          setUser(user);
        } else {
          setUser(null);
        }
      }
    );

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
