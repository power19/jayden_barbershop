/**
 * WhatsApp client factory using whatsapp-web.js with LocalAuth.
 * LocalAuth stores the session on disk so you only need to scan
 * the QR code once — it survives restarts.
 */
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');

function createBot() {
  return new Client({
    authStrategy: new LocalAuth({
      dataPath: path.join(process.cwd(), '.wwebjs_auth'),
    }),
    puppeteer: {
      headless: true,
      // Fail an individual hung CDP call after 2 min instead of the 180s default.
      // The health-probe watchdog in index.js catches a dead page far sooner.
      protocolTimeout: 120_000,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    },
  });
}

module.exports = { createBot };
