import { THREAD_ID, myOpenAi } from "./openai";

const messages = await myOpenAi.beta.threads.messages.list(THREAD_ID);

const formatted = messages.data.map(
  (x, i) =>
    `Thread message #${i} ` +
    JSON.stringify(
      x.content.map((y) => (y.type === "image_file" ? y.image_file : y.text))
    )
);

console.log(formatted);
