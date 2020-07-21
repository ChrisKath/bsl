import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm'
import User from './user'

@Entity('urls')
export default class Url {

  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id'
  })
  public id: number

  @Column({
    type: 'varchar',
    length: 12,
    name: 'key'
  })
  @Index({ unique: true })
  public key: string

  @Column({
    type: 'text',
    unique: true,
    name: 'href'
  })
  public href: string

  @Column({
    type: 'varchar',
    length: 128,
    name: 'title'
  })
  public title: string

  @Column({
    type: 'int',
    length: 2,
    default: 1,
    name: 'type'
  })
  public type: number

  @Column({
    type: 'date',
    length: 2,
    nullable: true,
    default: null,
    name: 'expiry'
  })
  public expiry: Date

  @Column({
    type: 'text',
    nullable: true,
    default: null,
    name: 'redirect'
  })
  public redirect: string

  @Column({
    type: 'tinyint',
    default: true,
    name: 'enabled'
  })
  public enabled: boolean

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
  @ManyToOne(type => User, user => user.urls)
  public user: User

}