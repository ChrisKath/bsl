import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ShareColumn } from '../utils'

@Entity({ name: 'tags' })
export class TagEntity extends ShareColumn {

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

}