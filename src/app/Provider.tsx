"use client";

import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
}
const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <NextUIProvider className="min-h-screen flex flex-col">
        <I18nProvider locale="UA-ua">{children}</I18nProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Provider;
