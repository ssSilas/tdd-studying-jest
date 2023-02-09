import { Module } from '@nestjs/common';
import { FunctionForTestsService } from './function-for-tests.service';

@Module({
  controllers: [],
  providers: [FunctionForTestsService]
})
export class FunctionForTestsModule {}
