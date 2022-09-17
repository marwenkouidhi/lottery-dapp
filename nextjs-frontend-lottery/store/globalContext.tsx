import React from "react";
import AuthProvider from "./authContext";

type Props = {
  children: JSX.Element;
};

const GlobalProvider = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default GlobalProvider;
