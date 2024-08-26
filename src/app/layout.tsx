import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Provider from "@/app/Provider";
import Navigation from "@/components/nav/Navigation";
import "@/assets/styles/global.sass";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sense Monitoring App",
  description: "App to generate Message for Monitoring Department.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="blue-dark text-foreground bg-background px-14">
        <Provider>
          <Navigation />
          <div className="py-10">{children}</div>
        </Provider>
        <ToastContainer position="top-right" theme="dark" />
      </body>
    </html>
  );
}
