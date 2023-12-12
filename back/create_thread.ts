import { myOpenAi } from "./openai";

export const createThread = async () => {
  const thread = await myOpenAi.beta.threads.create({
    messages: [
      {
        role: "user",
        content: "",
      },
    ],
  });
  console.log("Thread ID", thread.id);
  return thread.id;
};

await createThread();
