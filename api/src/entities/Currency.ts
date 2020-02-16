import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn} from 'typeorm';

import is from 'utils/validation';

@Entity()
class Currency extends BaseEntity {
  static validations = {
    type: [is.required(), is.maxLength(100)],
    value: [is.required(), is.maxLength(100)]
  };

  @ObjectIdColumn()
  _id: string;

  @Column('varchar')
  type: string;

  @Column('float')
  value: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Currency;
