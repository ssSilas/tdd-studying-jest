import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'account' })
export class AccountEntity {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @Column({ allowNull: false })
  balance: number

  constructor(id: number, balance: number) {
    this.id = id
    this.balance = balance
  }
}