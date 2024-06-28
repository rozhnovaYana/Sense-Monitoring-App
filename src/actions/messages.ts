"use server";

import path from "path";
import fs from "fs";
import { FormStateDB } from "@/types/Form";
import matter from "gray-matter";

const limit = 10;

const rootDir = "./db";
const filePath = path.join(rootDir, "messages.json");

export const getMessages = () => {
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(rawFile);
  return content ? JSON.parse(content) : [];
};

export const saveMessage = async (
  data: FormStateDB
): Promise<FormStateDB[]> => {
  const fileData = await getMessages();
  fileData?.length >= limit && fileData.pop();
  const updatedData = [data, ...fileData];
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  return updatedData;
};
