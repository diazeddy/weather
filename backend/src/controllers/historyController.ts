import { Request, Response } from 'express';
import { getFilterHistory } from '../models/history';

export const getHistory = (req: Request, res: Response): void => {
  try {
    console.log(req);
    const history = getFilterHistory();
    res.status(200).json(history);
  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};