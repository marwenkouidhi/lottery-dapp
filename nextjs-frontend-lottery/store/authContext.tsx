import React, { createContext, useContext, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
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
  account: string;
  network: string;
  balance: string;
  provider: ethers.providers.Web3Provider;
  metamask: Promise<object>;
};
type authContextType = {
  authState: authStateType;
  login: () => void;
  logout: () => void;
  initializeState: () => void;
};

const initialContext: authContextType = {
  authState: {
    provider: null,
    metamaskInstalled: null,
    account: null,
    network: null,
    isAuthenticated: null,
    balance: null,
    metamask: null,
  },
  login: () => {},
  logout: () => {},
  initializeState: () => {},
};

const AuthContext = createContext<authContextType | null>(initialContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<authStateType>(
    initialContext.authState
  );

  const initializeState = async () => {
    try {
      const metamask: Promise<object> = await detectEthereumProvider();
      if (metamask) {
        const account = (await metamask.request({ method: "eth_accounts" }))[0];
        const provider = new ethers.providers.Web3Provider(metamask);
        if (account) {
          setAuthState({
            ...authState,
            provider,
            metamaskInstalled: true,
            metamask,
            isAuthenticated: true,
            account,
            network: await metamask.request({ method: "eth_chainId" }),
            balance: formatEther(await provider.getBalance(account)),
          });
        } else {
          setAuthState({
            ...authState,
            provider,
            metamask,
            metamaskInstalled: true,
          });
        }
      } else {
        setAuthState({ ...authState, metamaskInstalled: false });
      }
    } catch (e) {}
  };
  const login = async () => {
    if (authState.metamaskInstalled) {
      await authState.metamask.request({ method: "eth_requestAccounts" });
      const account = (
        await authState.metamask.request({ method: "eth_accounts" })
      )[0];

      setAuthState({
        ...authState,
        isAuthenticated: true,
        account,
        network: await authState.metamask.request({ method: "eth_chainId" }),
        balance: formatEther(await authState.provider.getBalance(account)),
      });
    }
  };
  const logout = () => {
    setAuthState({ ...authState, isAuthenticated: false });
  };
  useEffect(() => {
    initializeState();
    ethereum.on("accountsChanged", () => {
      initializeState();
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        initializeState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
