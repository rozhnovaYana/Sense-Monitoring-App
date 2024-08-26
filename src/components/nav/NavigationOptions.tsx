"use client";

import React from "react";
import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { signOutAction } from "@/actions/sign-out";
import { User } from "@/types/User";

interface NavigationOptionsProps {
  user: User;
}

const NavigationOptions = ({ user }: NavigationOptionsProps) => {
  const pathname = usePathname();
  const links = [
    { title: "Головна", path: "/posts" },
    { title: "Розсилка", path: "/messages" },
    { title: "Аналітика", path: "/analytic" },
  ];

  if (user.role?.toLowerCase() === "admin") {
    links.push({ title: "Налаштування", path: "/admin" });
  }

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
        <NavbarItem className="text-gray-500">{user.name}</NavbarItem>
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
