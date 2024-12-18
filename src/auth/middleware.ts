import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private supabase;

  constructor() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data) {
      return res.status(401).send('Unauthorized');
    }

    req['user'] = data.user;
    next();
  }
}
