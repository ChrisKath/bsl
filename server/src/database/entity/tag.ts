import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'tags' })
export default class Tag {

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