"use client";

import React from "react";
import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/actions/sign-out";

const NavigationOptions = () => {
  const pathname = usePathname();
  const links = [
    { title: "Home", path: "/" },
    { title: "Повідомлення", path: "/messages" },
    { title: "Аналітика", path: "/analytic" },
  ];
  return (
    <>
      <NavbarContent>
        {links.map(({ path, title }, index) => (
          <NavbarItem key={index} isActive={pathname === path}>
            <Link className="px-5" color="foreground" href={path}>
              {title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button variant="bordered" onClick={() => signOutAction()}>
            Вийти
          </Button>
        </NavbarItem>
      </NavbarContent>
    </>
  );
};

export default NavigationOptions;
