import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionForTestsService {

  sum(a: number, b: number): number {
    return a + b
  }

  subtract(a: number, b: number): number {
    return a - b
  }
}
