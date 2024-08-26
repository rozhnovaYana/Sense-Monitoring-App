export type userKeys = "name" | "role" | "login";

export type User = {
  [K in userKeys]: string;
} & { id: string };
