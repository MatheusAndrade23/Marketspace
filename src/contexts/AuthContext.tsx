import { createContext, ReactNode, useState, useEffect } from "react";

export type AuthContextDataProps = {
  // user: UserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
