import { UpdateDateColumn, CreateDateColumn } from 'typeorm'

export class ShareColumn {
  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public updatedAt: Date;
}
