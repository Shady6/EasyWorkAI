import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createMessageAndRun, tryRetrieveMessages } from '../open_ai/open_ai';
import { Message } from './Message';

const testMessages = [
  { id: 1, text: 'Hi there!', sender: 'bot' },
  { id: 2, text: 'Hello!', sender: 'user' },
  { id: 3, text: 'How can I assist you today?', sender: 'bot' },
];

export function Main() {
  const [messages, setMesssages] = useState(testMessages);
  const [input, setInput] = useState('');
  const [runId, setRunId] = useState('');

  const handleSend = async () => {
    if (input.trim() !== '') {
      setInput('');
      setMesssages([
        ...messages,
        { id: messages[messages.length - 1].id, text: input, sender: 'user' },
      ]);
      const res = await createMessageAndRun(input);
      setRunId(res);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let interval: NodeJS.Timeout;
    const foo = async () => {
      if (runId)
        interval = setInterval(async () => {
          const newAIMsg = await tryRetrieveMessages(runId);
          if (newAIMsg)
            setMesssages([
              ...messages,
              {
                id: messages[messages.length - 1].id,
                text: newAIMsg,
                sender: 'UI',
              },
            ]);
        }, 300);
    };
    // eslint-disable-next-line no-undef

    return () => clearInterval(interval);
  }, [runId]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.200',
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              onKeyUp={(e) => e.key === 'Enter' && handleSend()}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
