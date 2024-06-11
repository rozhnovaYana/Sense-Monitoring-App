import type { Metadata } from "next";
import "@/assets/styles/global.sass";
import Provider from "@/app/Provider";

export const metadata: Metadata = {
  title: "Sense App Monitoring",
  description: "Generate messages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="blue-dark text-foreground bg-background px-14">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
