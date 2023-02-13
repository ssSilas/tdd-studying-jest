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
      this.checkPayerBalanceErros(payer, transferAmount)
      this.checkPriceErros(transferAmount)

      let percentage: number = this.numberPercentage(transferAmount)
      const valuePercentage = this.addPercentage(transferAmount, percentage)
      console.log(valuePercentage)
      payer.balance = this.addTax(payer, valuePercentage) - transferAmount
      receiver.balance = receiver.balance + transferAmount
      return [payer, receiver]

    } catch (error) { throw error }
  }

  addTax(payer: AccountEntity, percentageInAmount: number = 0) {
    const tax = 100
    return payer.balance - (tax + percentageInAmount)
  }

  checkPayerBalanceErros(payer: AccountEntity, transferAmount: number, tax: number = 100) {
    const subtract = payer.balance - (transferAmount + tax)
    if (subtract < 0) throw new Error(`Saldo insuficiente`);
    return true
  }

  checkPriceErros(transferAmount: number) {
    if (transferAmount <= 0) throw new Error(`O valor tranferido é 0 ou negativo`);
    if (transferAmount < 1000) throw new Error(`Não é possivel transferir menos de 1000`);
    if (transferAmount > 9999) throw new Error(`Não é possivel transferir menos de 9999`);
    return true
  }

  numberPercentage(transferAmount: number) {
    if (transferAmount >= 1000 && transferAmount <= 5000) return 5
    if (transferAmount > 5000) return 10
    return 0
  }

  addPercentage(transferAmount: number, percentage: number) {
    return transferAmount * (percentage / 100)
  }
}
