import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ManyToOne
} from 'typeorm';

import is from 'utils/validation';
import User from './User';

@Entity()
class UserCurrency extends BaseEntity {
  static validations = {
    type: [is.required(), is.maxLength(100)],
    value: [is.required(), is.maxLength(100)]
  };

  @ObjectIdColumn()
  _id: string;

  @Column('varchar')
  userId: string;
  
  @Column('varchar')
  type: string;

  @Column('float')
  value: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.currencies,
  )
  user: User;
}

export default UserCurrency;
