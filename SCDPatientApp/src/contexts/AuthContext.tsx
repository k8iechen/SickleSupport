import React from "react";
import AuthStore, { IAuthStore } from "../stores/Auth";

export const AuthContext = React.createContext<IAuthStore>(AuthStore());
