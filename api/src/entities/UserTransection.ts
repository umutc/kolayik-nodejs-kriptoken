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
    email: [is.required(), is.email(), is.maxLength(200)],
    password: [is.required(), is.maxLength(200)],
  };

  @ObjectIdColumn()
  _id: string;

  @Column('varchar')
  userId: string;

  @Column('varchar')
  type: string;

  @Column('float')
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserTransection;
