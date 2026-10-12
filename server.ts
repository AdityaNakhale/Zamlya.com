import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// API Configuration for APInex Proxy
const APINEX_ENDPOINT = process.env.APINEX_URL || 'https://api.apinex.bond/v1/chat/completions';
const APINEX_API_KEY = process.env.APINEX_API_KEY || 'sk-apxbe44eeabe278792cd5156bda372a992601dc17007659fab';
const DEFAULT_MODEL = process.env.APINEX_MODEL || 'claude-sonnet-5.5';

/**
 * POST /api/chat
 * Secure server-side proxy route:
 * Keeps the API key secret on the server, formats messages,
 * and handles timeout, network, and quota responses.
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, messages, model = DEFAULT_MODEL, context } = req.body;

    const userText = message || (Array.isArray(messages) && messages[messages.length - 1]?.content);
    if (!userText || typeof userText !== 'string' || !userText.trim()) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const systemPrompt = `You are Zamlya AI, the official intelligent assistant for Zamlya.com and YouTube Channel ("Amravati kr ahe na bhau. 😎" @MH27_wale).
You are enthusiastic, knowledgeable about technical engineering, student projects, web apps, and YouTube Shorts from playlist PLMnA0kI1d1R8.
Answer questions cleanly and helpfully with markdown bullet points and emojis.`;

    // Construct conversation payload
    const formattedMessages = [
      { role: 'system', content: systemPrompt }
    ];

    if (Array.isArray(messages)) {
      formattedMessages.push(...messages.slice(-6));
    } else {
      formattedMessages.push({ role: 'user', content: userText.trim() });
    }

    // Call upstream APInex endpoint securely from backend
    const apiRes = await fetch(APINEX_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APINEX_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await apiRes.json().catch(() => null);

    if (!apiRes.ok) {
      console.warn(`[APInex Error] HTTP ${apiRes.status}:`, data);
      const errMsg = data?.error?.message || `APInex gateway error (HTTP ${apiRes.status})`;
      return res.status(apiRes.status).json({
        error: errMsg,
        type: data?.error?.type || 'upstream_error',
        status: apiRes.status
      });
    }

    const reply = data?.choices?.[0]?.message?.content || '';
    return res.json({
      reply,
      model: data?.model || model,
      usage: data?.usage
    });
  } catch (error: any) {
    console.error('[Proxy Error]:', error);
    return res.status(500).json({
      error: 'Failed to communicate with AI service.',
      details: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Zamlya AI Backend Proxy', model: DEFAULT_MODEL });
});

// Vite Middleware for SPA Development & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
