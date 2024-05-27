import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  // getInitService(): string {
  //   return 'Running service!';
  // }
  getInitService(res: Response) {
    res.redirect('/swagger');
  }
}
