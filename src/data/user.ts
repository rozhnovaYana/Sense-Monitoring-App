import { userKeys } from "@/types/User";

export const userFields = {
  name: "Ім'я",
  login: "Логін",
  role: "Роль",
  actions: "",
};
type userFileds = (userKeys | "actions")[];
export const sortDescriptors: userFileds = ["name", "login", "role", "actions"];
