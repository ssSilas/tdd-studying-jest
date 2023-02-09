import { Module } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';

@Module({
  controllers: [],
  providers: [
    AccountService,
    {
      provide: "ACCOUNT",
      useValue: AccountEntity
    }
  ],
  exports: [AccountService, 'ACCOUNT']
})
export class AccountModule { }
