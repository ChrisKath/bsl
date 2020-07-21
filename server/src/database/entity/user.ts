import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm'
import Url from './url'

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
    name: 'employeeCode'
  })
  @Index({ unique: true })
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
    name: 'username'
  })
  @Index({ unique: true })
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
  @Index({ unique: false })
  public createdBy: number

  @Column({
    type: 'smallint',
    name: 'updated_by'
  })
  @Index({ unique: false })
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

  // Relations
  @OneToMany(type => Url, url => url.user)
  public urls: Url[]

}