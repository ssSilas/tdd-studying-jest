import { Test, TestingModule } from '@nestjs/testing';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  describe('Tranferir dinheiro de uma conta para outra', () => {
    it("transferindo 1000 dinheiros", () => {
      //setup
      const accountPayer = new AccountEntity(1, 1000)
      const accountReceiver = new AccountEntity(2, 0)

      //execute
      const transferRun = service.transfer(accountPayer, accountReceiver, 1000)

      //espero que seja retornado um AccountEntity[] contendo duas contas
      expect(transferRun).toHaveLength(2)

      expect(transferRun).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, balance: 0 }),
          expect.objectContaining({ id: 2, balance: 1000 }),
        ])
      )
    })

    it("retornar exceção quando a tranferência for menor que 1", () => {
      const accountPayer = new AccountEntity(1, 100)
      const accountReceiver = new AccountEntity(2, 200)

      const transferRun = () => { service.transfer(accountPayer, accountReceiver, -50) }

      expect(transferRun).toThrow(Error(`O valor tranferido é 0 ou negativo`))
    })
  })

  describe('tranferWithTx', () => {
    it("adicionando o valor da taxa 100 na transferência de 1500", () => {
      const accountPayer = new AccountEntity(1, 1500)
      const accountReceiver = new AccountEntity(2, 500)

      const transferRun = service.tranferWithTax(accountPayer, accountReceiver, 1000)

      expect(transferRun).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, balance: 350 }),
          expect.objectContaining({ id: 2, balance: 1500 }),
        ])
      )
    })
  })

  describe('International Transfer', () => {
    it("Não é possivel transferir menos de 1000", () => {
      const accountPayer = new AccountEntity(1, 500)
      const accountReceiver = new AccountEntity(2, 500)

      const transferRun = () => service.tranferWithTax(accountPayer, accountReceiver, 200)

      expect(transferRun).toThrow(Error("Não é possivel transferir menos de 1000"))
    })

    it("Não é possivel transferir mais de 9999", () => {
      const accountPayer = new AccountEntity(1, 15000)
      const accountReceiver = new AccountEntity(2, 500)

      const transferRun = () => service.tranferWithTax(accountPayer, accountReceiver, 10000)

      expect(transferRun).toThrow(Error("Não é possivel transferir menos de 9999"))
    })

    it("Saldo insuficiente", () => {
      const accountPayer = new AccountEntity(1, 500)
      const accountReceiver = new AccountEntity(2, 0)

      const transferRun = () => service.tranferWithTax(accountPayer, accountReceiver, 1000)

      expect(transferRun).toThrow(Error("Saldo insuficiente"))
    })
  })

  describe("Tranferencia com taxa + porcentagem", () => {
    it("Retornando 10% de 1000", () => {
      const percentage = service.addPercentage(1000, 10)
      expect(percentage).toEqual(100)
    })

    it("Entre 1000 a 5000 deve conter uma taxa de 5% sobre o valor da tranferencia + taxa padrão", () => {
      const accountPayer = new AccountEntity(1, 1500)
      const accountReceiver = new AccountEntity(2, 100)

      const addPercentage = service.tranferWithTax(accountPayer, accountReceiver, 1000)

      expect(addPercentage).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, balance: 350 }),
          expect.objectContaining({ id: 2, balance: 1100 }),
        ])
      )
    })

    it("Maior que 5000 deve conter uma taxa de 10% sobre o valor da tranferencia + taxa padrão", () => {
      const accountPayer = new AccountEntity(1, 6000)
      const accountReceiver = new AccountEntity(2, 100)

      const addPercentage = service.tranferWithTax(accountPayer, accountReceiver, 5100)

      expect(addPercentage).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, balance: 290 }),
          expect.objectContaining({ id: 2, balance: 5200 }),
        ])
      )
    })
  })
});
