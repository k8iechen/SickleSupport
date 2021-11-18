import React from "react";
import { TUser } from "../models/User";

export const AuthContext = React.createContext<TUser | null | undefined>(
  undefined
);
