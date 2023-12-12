import { sleep } from "bun";
import { ASSISTANT_ID, THREAD_ID, myOpenAi } from "./openai";

export const createMessageAndRun = async (text: string) => {
  await createMessage(text);
  const conversation = await createRun();
  return conversation;
};

const createMessage = async (text: string) => {
  await myOpenAi.beta.threads.messages.create(THREAD_ID, {
    role: "user",
    content: text,
  });
};

const createRun = async () => {
  const run = await myOpenAi.beta.threads.runs.create(THREAD_ID, {
    assistant_id: ASSISTANT_ID,
  });

  let runStatus;
  while (runStatus?.status == "in_progress") {
    runStatus = await myOpenAi.beta.threads.runs.retrieve(THREAD_ID, run.id);
    await sleep(1000);
  }

  const messages = await myOpenAi.beta.threads.messages.list(THREAD_ID);

  return messages.data.map(
    (x, i) =>
      `Thread message #${i} ` +
      x.content.map((y) => (y.type === "image_file" ? y.image_file : y.text))
  );
};
