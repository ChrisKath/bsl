import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'icons' })
export default class Icon {

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