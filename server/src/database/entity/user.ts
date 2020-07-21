import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'

@Entity('users')
export default class User {

  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id'
  })
  public id: number

  @Column({
    type: 'int',
    length: 6,
    unique: true,
    unsigned: true,
    name: 'employeeCode'
  })
  public employeeCode: number

  @Column({
    type: 'varchar',
    length: 64,
    name: 'employeeName'
  })
  public employeeName: string

  @Column({
    type: 'varchar',
    length: 16,
    unique: true,
    name: 'username'
  })
  public username: string

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password'
  })
  public password: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'avatar'
  })
  public avatar: string

  @Column({
    type: 'tinyint',
    default: true,
    name: 'activated'
  })
  public activated: boolean

  @Column({
    type: 'tinyint',
    default: false,
    name: 'isAdmin'
  })
  public isAdmin: boolean

  @Column({
    type: 'smallint',
    name: 'created_by'
  })
  public createdBy: number

  @Column({
    type: 'smallint',
    name: 'updated_by'
  })
  public updatedBy: number

  @Column({
    type: 'timestamp',
    default: new Date(),
    name: 'created_at'
  })
  public createdAt: Date

  @Column({
    type: 'timestamp',
    default: new Date(),
    name: 'updated_at'
  })
  public updatedAt: Date

}