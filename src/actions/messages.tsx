"use server";

import path from "path";
import fs from "fs";
import { FormState } from "@/types/Form";
import matter from "gray-matter";

const limit = 10;

const rootDir = "./data";
const filePath = path.join(rootDir, "messages.json");

export const getMessages = () => {
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(rawFile);
  return content ? JSON.parse(content) : [];
};

export const saveMessage = async (data: FormState) => {
  const fileData = await getMessages();
  fileData?.length >= limit && fileData.pop();
  const updatedData = [data, ...fileData];
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
};
