// src/controllers/urlController.ts
import { Request, Response } from 'express';
import { UrlStore } from '../models/url';

function generateShortUrl(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const shortenUrl = (req: Request, res: Response): void => {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    res.status(400).json({ error: 'Invalid URL' });
    return;
  }

  try {
    let urlRecord = Array.from(UrlStore.values()).find(record => record.originalUrl === url);

    if (urlRecord) {
      res.json({ shortUrl: `http://short.ly/${urlRecord.shortUrl}` });
      return;
    }

    let shortUrl: string;
    do {
      shortUrl = generateShortUrl();
    } while (UrlStore.has(shortUrl));

    urlRecord = { originalUrl: url, shortUrl, visits: 0, createdAt: new Date() };
    UrlStore.set(shortUrl, urlRecord);

    res.json({ shortUrl: `http://short.ly/${shortUrl}` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectUrl = (req: Request, res: Response): void => {
  const { shortUrl } = req.params;

  try {
    const urlRecord = UrlStore.get(shortUrl);

    if (urlRecord) {
      urlRecord.visits += 1;
      res.redirect(urlRecord.originalUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}