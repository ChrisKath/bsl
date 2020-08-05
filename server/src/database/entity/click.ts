import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from 'typeorm'
import { Url } from '..'

@Entity({ name: 'clicks' })
export class ClickEntity {

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
    type: 'text',
    name: 'user_ip'
  })
  public userIp: string

  @Column({
    type: 'text',
    name: 'description'
  })
  public description: string

  @Column({
    type: 'datetime',
    name: 'clicked_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public clickedAt: Date

  @ManyToOne(() => Url, (url: Url) => url.id)
  @JoinColumn({ name: 'url_id' })
  public url: Url

}