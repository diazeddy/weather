// src/routes/urlRoutes.ts
import express, { Router } from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController';

const router: Router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:shortUrl', redirectUrl);

export default router;