import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm'
import { ShareColumn } from '../utils'
import { User, Tag, Click } from '..'

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

  @ManyToOne(() => User, (user: User) => user.urls)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id'
  })
  public urlCreatedBy: User

  @ManyToOne(() => User, (user: User) => user.urls)
  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id'
  })
  public urlUpdatedBy: User

  @ManyToMany(() => Tag, (tag: Tag) => tag.urls)
  @JoinTable({
    name: 'tagging',
    joinColumn: {
      name: 'url_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id'
    }
  })
  public tags: Tag[]

  @OneToMany(() => Click, (click: Click) => click.url)
  public clicks: Click[]

}