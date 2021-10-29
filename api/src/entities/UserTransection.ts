import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn} from 'typeorm';

import is from 'utils/validation';

@Entity()
class UserTransection extends BaseEntity {
  static validations = {
    userId: [is.required()],
    type: [is.required()],
    amount: [is.required()],
    value: [is.required()],
  };

  @ObjectIdColumn()
  _id: string;

  @Column('varchar')
  userId: string;

  @Column('varchar')
  type: string;

  @Column('float')
  amount: number;

  @Column('float')
  value: number;

  @Column('varchar')
  transectionType: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserTransection;
