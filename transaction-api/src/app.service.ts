import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getInitService(res: Response) {
    res.redirect('/graphql');
  }
}
