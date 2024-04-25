"use client";

import { Session } from "lucia";
import React, { createContext, useContext } from "react";

type SessionProviderProps = {
  user: {
    id: string;
    name?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
  };
} | null;

const SessionContext = createContext<SessionProviderProps>(
  {} as SessionProviderProps
);

export const SessionProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SessionProviderProps;
}) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return sessionContext;
};

export default SessionProvider;
