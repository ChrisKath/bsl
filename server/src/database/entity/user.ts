import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { ShareColumn } from '../utils'
import { hashSync } from 'bcrypt'
import { Url } from '..'

@Entity({ name: 'users' })
export class UserEntity extends ShareColumn {

  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id'
  })
  public id: number

  @Column({
    type: 'int',
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
    name: 'username',
    transformer: {
      from: (value: string): string => value,
      to: (value: string): string => value.toLowerCase()
    }
  })
  @Index({ unique: true })
  public username: string

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    name: 'password',
    transformer: {
      from: (value: string): string => value,
      to: (value: string): string => hashSync(value, 10)
    }
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
    type: 'boolean',
    default: true,
    name: 'activated'
  })
  public activated: boolean

  @Column({
    type: 'boolean',
    default: false,
    name: 'isAdmin'
  })
  public isAdmin: boolean

  @Column({
    type: 'smallint',
    select: false,
    name: 'created_by'
  })
  @Index({ unique: false })
  public createdBy: number

  @Column({
    type: 'smallint',
    select: false,
    name: 'updated_by'
  })
  @Index({ unique: false })
  public updatedBy: number

  @OneToOne(() => UserEntity, (user: UserEntity) => user)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id'
  })
  public accountCreatedBy: UserEntity

  @OneToOne(() => UserEntity, (user: UserEntity) => user)
  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id'
  })
  public accountUpdatedBy: UserEntity

  @OneToMany(() => Url, (url: Url) => url.urlCreatedBy)
  @OneToMany(() => Url, (url: Url) => url.urlUpdatedBy)
  public urls: Url[]

}