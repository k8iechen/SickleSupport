import React from "react";
import AuthStore, { IAuthStore } from "../stores/auth.store";

export const AuthContext = React.createContext<IAuthStore>(AuthStore());
