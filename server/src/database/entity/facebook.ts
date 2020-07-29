import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import { ShareColumn } from '../utils'

@Entity({ name: 'facebook' })
export class FacebookEntity extends ShareColumn {

  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id'
  })
  public id: number

  @Column({
    type: 'varchar',
    length: 100,
    name: 'name'
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 30,
    name: 'type'
  })
  public type: string

  @Column({
    type: 'text',
    name: 'data'
  })
  public data: string

}