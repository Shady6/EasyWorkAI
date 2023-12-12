import express from "express";
import { createFile } from "./create_file";
import { createMessageAndRun } from "./create_run";

const app = express();

app.post("/file", async (req, res) => {
  await createFile(req.body.path);
  res.send(200);
});

app.post("/message", async (req, res) => {
  const conversation = await createMessageAndRun(req.body.text);
  res.status(200).json({ conversation });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ...`);
});
