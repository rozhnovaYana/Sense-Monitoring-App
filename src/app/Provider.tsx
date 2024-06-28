"use client";

import React, { ReactNode } from "react";

import { I18nProvider } from "@react-aria/i18n";
import { NextUIProvider, ScrollShadow } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <I18nProvider locale="UA-ua">
          <ScrollShadow
            hideScrollBar
            className="min-h-screen flex flex-col h-screen"
          >
            {children}
          </ScrollShadow>
        </I18nProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Provider;
