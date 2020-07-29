import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from 'typeorm'
import { ShareColumn } from '../utils'
import { UserEntity } from './user'

@Entity({ name: 'urls' })
export class UrlEntity extends ShareColumn {

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
    default: 1,
    name: 'type'
  })
  public type: number

  @Column({
    type: 'date',
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
    type: 'boolean',
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

  // Relations
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.urls)
  @JoinColumn({ name: 'created_by' })
  public user: UserEntity | null

}