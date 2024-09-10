import { Message } from "@prisma/client";

export type Level = {
  text: string;
  color: string;
};

export type FormState = Omit<Message, "id"> & {
  id?: number;
};
