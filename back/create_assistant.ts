import { myOpenAi } from "./openai";

export const createAssistant = async () => {
  const assistant = await myOpenAi.beta.assistants.create({
    name: "EasyWorkAI",
    description:
      "You help programmers to do their job. You analyze files given to you to help answer programmers questions.",
    model: "gpt-3.5-turbo-1106",
    tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
  });
  console.log("Assistant ID", assistant.id);
  return assistant.id;
};

await createAssistant();
