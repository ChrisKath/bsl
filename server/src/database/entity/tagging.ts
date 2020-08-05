import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'
import { Url, Tag } from '..'

@Entity({ name: 'tagging' })
export class TaggingEntity {

  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id'
  })
  public id: number

  @Column({
    type: 'smallint',
    name: 'url_id'
  })
  public urlId: number

  @Column({
    type: 'smallint',
    name: 'tag_id'
  })
  public tagId: number

}