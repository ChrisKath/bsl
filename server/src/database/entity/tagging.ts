import { PrimaryGeneratedColumn, Entity, Column, Index } from 'typeorm'

@Entity('tagging')
export default class Tagging {

  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id'
  })
  public id: number

  @Column({
    type: 'smallint',
    name: 'url_id'
  })
  @Index({ unique: false })
  public urlId: number

  @Column({
    type: 'smallint',
    name: 'tag_id'
  })
  @Index({ unique: false })
  public tagId: number

}