/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs'

import { boilerplate } from '../helpers/boilerplate'

const app = express();

app.get('/api/v1/summary', async (req, res) => {

  const html = `
  <div>Hello to puppeteer</div>
  `
  const title = "First try"

  const browser = await puppeteer.launch({
    headless: true,
    //executablePath: '/usr/bin/chromium-browser',
    executablePath: 'google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox' ]
  });
  const page = await browser.newPage();
  
  await page.emulateMediaType('screen');
  await page.setViewport({ width: 1080, height: 720 });
  await page.setContent(boilerplate({ title: title, content: html }));

  const container = await page.$('.container');
  const boundingBox = await container.boundingBox();
  const screenshot = await page.screenshot({
    clip: {
      x: boundingBox.x,
      y: boundingBox.y,
      width: Math.min(boundingBox.width, page.viewport().width),
      height: Math.min(boundingBox.height, page.viewport().height),
    },
  });

  await browser.close();

  // Save file to disk
  fs.writeFileSync('screenshot.jpg', screenshot);

  // Send json response

  res.status(200).json({
    success: true,
    event: "IMAGE_GENERATED",
    result: {
      url: "screenshot.jpg"
    }
  });

  return res.end();
});

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
