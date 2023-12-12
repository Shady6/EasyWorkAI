import { myOpenAi } from "./openai";

const assistants = await myOpenAi.beta.assistants.list();
console.log(assistants);
