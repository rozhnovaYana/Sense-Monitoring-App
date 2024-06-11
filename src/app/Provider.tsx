"use client";

import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider className="min-h-screen flex flex-col">
      <I18nProvider locale="UA-ua">{children}</I18nProvider>
    </NextUIProvider>
  );
};

export default Provider;
