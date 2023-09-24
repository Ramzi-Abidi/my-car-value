import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table // this table decorator will create an abstraction table to this "User" entity
export class Report extends Model<Report> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  report_id: string;

  @Column({
    type: DataType.NUMBER,
  })
  price: number;
}
