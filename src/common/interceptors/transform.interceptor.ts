import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor {
  intercept(context, next) {
    return next
      .handle()
      .pipe(map((data) => ({ data, code: 0, success: true })));
  }
}
