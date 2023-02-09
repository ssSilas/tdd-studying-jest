import { Injectable } from '@nestjs/common';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  transfer(payer: AccountEntity, receiver: AccountEntity, transferAmount: number): AccountEntity[] {
    if (transferAmount > 0) {
      payer.balance = payer.balance - transferAmount
      receiver.balance = receiver.balance + transferAmount
      return [payer, receiver]
    } else {
      throw new Error(`O valor tranferido é 0 ou negativo`);
    }
  }

  tranferWithTax(payer: AccountEntity, receiver: AccountEntity, transferAmount: number) {
    payer.balance = this.addTax(payer) - transferAmount
    receiver.balance = receiver.balance + transferAmount
    return [payer, receiver]
  }

  addTax(payer: AccountEntity) {
    const tax = 100
    return payer.balance - tax
  }
}
