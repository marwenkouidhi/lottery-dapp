import React, { createContext, useContext, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
type Props = {
  children: JSX.Element;
};
declare global {
  interface Window {
    ethereum: any;
  }
}
type authStateType = {
  metamaskInstalled: boolean;
  isAuthenticated: boolean;
  accounts: string[];
  network: string;
};
type authContextType = {
  authState: authStateType;
  login: () => void;
  logout: () => void;
  getProvider: () => void;
};

const initialContext: authContextType = {
  authState: {
    metamaskInstalled: null,
    isAuthenticated: null,
    accounts: [],
    network: null,
  },
  login: () => {},
  logout: () => {},
  getProvider: () => {},
};

const AuthContext = createContext<authContextType | null>(initialContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<authStateType>(
    initialContext.authState
  );
  const login = () => {
    if (authState.metamaskInstalled) {
      setAuthState({ ...authState, isAuthenticated: true });
    }
  };
  const logout = () => {};

  const getProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const network = await provider.request({
        method: "eth_chainId",
      });
      setAuthState({ ...authState, metamaskInstalled: true, network });
    } else {
      setAuthState({ ...authState, metamaskInstalled: false });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        getProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
