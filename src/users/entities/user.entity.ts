import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  email: string;

  @Column
  password: number;

  @Column
  name: string;
}
