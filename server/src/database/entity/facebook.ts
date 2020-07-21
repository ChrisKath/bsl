import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

@Entity('facebook')
export default class Facebook {

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