import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Report extends Model {
  @Column
  id: number;

  @Column
  price: number;
}
