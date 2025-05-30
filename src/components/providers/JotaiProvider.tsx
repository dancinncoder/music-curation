"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";
import NicknameInitializer from "../NicknameInitializer";

// app_user.nickname에 대한 Atom Provider

export function JotaiProvider({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <NicknameInitializer />
      {children}
    </Provider>
  );
}
