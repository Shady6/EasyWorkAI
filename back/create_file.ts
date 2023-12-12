import fs from "fs";
import { ASSISTANT_ID, myOpenAi } from "./openai";

export const createFile = async (path: string) => {
  const file = await myOpenAi.files.create({
    file: fs.createReadStream(path),
    purpose: "assistants",
  });
  await myOpenAi.beta.assistants.files.create(ASSISTANT_ID, {
    file_id: file.id,
  });
  console.log("File ID", file.id);
  return file.id;
};
