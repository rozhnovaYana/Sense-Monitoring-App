import React from "react";
import { Navbar } from "@nextui-org/react";

import NavigationOptions from "@/components/nav/NavigationOptions";
import { auth } from "@/auth";

const Navigation = async () => {
  const session = await auth();

  if (!session?.user?.id) return null;

  return (
    <Navbar
      classNames={{
        wrapper: "p-0",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
      isBordered
      shouldHideOnScroll
      maxWidth="full"
    >
      <NavigationOptions user={session.user} />
    </Navbar>
  );
};

export default Navigation;
