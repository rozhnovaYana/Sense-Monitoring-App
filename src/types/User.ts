export type userKeys = "name" | "role" | "login" | "actions";

export type User = {
  [K in userKeys]: string;
} & { id: string };
