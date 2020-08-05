import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { ShareColumn } from '../utils'
import { Url } from '..'

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
 
  // Relations
  @ManyToMany(() => Url, (url: Url) => url.tags)
  @JoinTable({
    name: 'tagging',
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'url_id',
      referencedColumnName: 'id'
    }
  })
  public urls: Url[]

}