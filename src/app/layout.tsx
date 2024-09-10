import { ReactNode } from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Provider from "@/app/Provider";
import Navigation from "@/components/nav/Navigation";

import "@/assets/styles/global.sass";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Monitoring App",
  description: "App to generate Message for Monitoring Department.",
};

const sans_serif = Noto_Sans({ subsets: ['cyrillic'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`blue-dark text-foreground bg-background px-14 ${sans_serif.className}`}>
        <Provider>
          <Navigation />
          <div className="py-16 h-full">{children}</div>
        </Provider>
        <ToastContainer position="top-right" theme="dark" />
      </body>
    </html>
  );
}
