import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ShareColumn } from '../utils'

@Entity({ name: 'icons' })
export class IconEntity extends ShareColumn {

  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id'
  })
  public id: number

  @Column({
    type: 'varchar',
    length: 64,
    name: 'name'
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    name: 'image'
  })
  public image: string

}