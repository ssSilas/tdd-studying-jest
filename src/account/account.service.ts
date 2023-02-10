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
    try {
      this.checkPriceErros(transferAmount)
      payer.balance = this.addTax(payer) - transferAmount
      receiver.balance = receiver.balance + transferAmount
      return [payer, receiver]
    } catch (error) {
      throw error
    }
  }

  addTax(payer: AccountEntity) {
    const tax = 100
    return payer.balance - tax
  }

  checkPriceErros(transferAmount: number) {
    if (transferAmount <= 0) throw new Error(`O valor tranferido é 0 ou negativo`);
    if (transferAmount < 1000) throw new Error(`Não é possivel transferir menos de 1000`);
    if (transferAmount > 9999) throw new Error(`Não é possivel transferir menos de 9999`);
    return true
  }

}
