"use server";
import { signOut } from "@/auth";

export const signOutAction = async () => signOut({ redirectTo: "/login" });
