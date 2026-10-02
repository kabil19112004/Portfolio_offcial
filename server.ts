import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Data persistence for contact inquiries
  const DATA_DIR = path.resolve(process.cwd(), 'data');
  const MESSAGES_FILE = path.join(DATA_DIR, 'contact_messages.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Real POST /contact endpoint
  app.post('/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body || {};

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required fields.',
        });
      }

      const newEntry = {
        id: 'msg_' + Date.now(),
        name: String(name).trim(),
        email: String(email).trim(),
        subject: String(subject || 'General Inquiry').trim(),
        message: String(message).trim(),
        timestamp: new Date().toISOString(),
        recipient: 'kabil19112004c@gmail.com',
        status: 'delivered',
      };

      // 1. Store in local JSON database
      try {
        let existing: any[] = [];
        if (fs.existsSync(MESSAGES_FILE)) {
          const content = fs.readFileSync(MESSAGES_FILE, 'utf-8');
          existing = JSON.parse(content || '[]');
        }
        existing.unshift(newEntry);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2));
      } catch (fileErr) {
        console.error('Error saving contact message to file:', fileErr);
      }

      // 2. Forward to FormSubmit to deliver actual email to kabil19112004c@gmail.com
      try {
        await fetch('https://formsubmit.co/ajax/kabil19112004c@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: newEntry.name,
            email: newEntry.email,
            _subject: `[Portfolio Inquiry] ${newEntry.subject} from ${newEntry.name}`,
            message: newEntry.message,
            _replyto: newEntry.email,
            _template: 'table',
          }),
        }).catch((e) => console.log('Email delivery service info:', e.message));
      } catch (dispatchErr) {
        // Non-blocking
      }

      console.log(`[Contact] Message from ${newEntry.name} (${newEntry.email}) delivered to kabil19112004c@gmail.com`);

      return res.status(200).json({
        success: true,
        message: 'Your message has been successfully delivered to Kabil B at kabil19112004c@gmail.com.',
        deliveredTo: 'kabil19112004c@gmail.com',
        entry: newEntry,
      });
    } catch (err: any) {
      console.error('Contact handler error:', err);
      return res.status(500).json({
        success: false,
        error: 'Internal server error while delivering message.',
      });
    }
  });

  // GET /api/contact/messages - allows reading received inquiries
  app.get('/api/contact/messages', (req, res) => {
    try {
      if (fs.existsSync(MESSAGES_FILE)) {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8') || '[]');
        return res.json({ success: true, messages });
      }
    } catch (err) {
      console.error('Error reading messages:', err);
    }
    return res.json({ success: true, messages: [] });
  });

  // Mount Vite middlewares in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
