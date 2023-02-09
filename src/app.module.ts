import { Module } from '@nestjs/common';
import { FunctionForTestsModule } from './function-for-tests/function-for-tests.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [FunctionForTestsModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
