import OpenAI from 'openai';

const myOpenAi = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});
const THREAD_ID = 'thread_8IHI6gye6E3wc84spxYfeIvi';
const ASSISTANT_ID = 'asst_yAujiTzcmHXZ6sArmcS3R7Ek';

const createMessage = async (text: string) => {
  await myOpenAi.beta.threads.messages.create(THREAD_ID, {
    role: 'user',
    content: text,
  });
};

const createRun = async () => {
  const run = await myOpenAi.beta.threads.runs.create(THREAD_ID, {
    assistant_id: ASSISTANT_ID,
  });
  return run.id;
};

export const createMessageAndRun = async (text: string) => {
  await createMessage(text);
  const runId = await createRun();
  return runId;
};

export const tryRetrieveMessages = async (
  runId: string,
): Promise<undefined | string[]> => {
  const runStatus = await myOpenAi.beta.threads.runs.retrieve(THREAD_ID, runId);
  if (runStatus.status === 'in_progress') return;

  const thread = await myOpenAi.beta.threads.messages.list(THREAD_ID);
  // eslint-disable-next-line consistent-return
  return thread.data.map(
    (x, i) =>
      `Thread message #${i} ${JSON.stringify(
        x.content.map((y) => (y.type === 'image_file' ? y.image_file : y.text)),
      )}`,
  );
};
