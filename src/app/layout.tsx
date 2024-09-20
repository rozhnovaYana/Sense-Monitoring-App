import { ReactNode } from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Provider from "@/app/Provider";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";

import "@/assets/styles/global.sass";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Monitoring App",
  description: "App to generate Message for Monitoring Department.",
};

const sans_serif = Noto_Sans({ subsets: ["cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`blue-dark text-foreground bg-background px-14 h-full ${sans_serif.className}`}
      >
        <Provider>
          <Navigation />
          <div className="pt-16 flex-1">{children}</div>
          <Divider />
          <Footer />
        </Provider>
        <ToastContainer position="top-right" theme="dark" />
      </body>
    </html>
  );
}
