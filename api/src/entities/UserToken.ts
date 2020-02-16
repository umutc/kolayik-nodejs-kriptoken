import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn
} from 'typeorm';

import is from 'utils/validation';

@Entity()
class UserToken extends BaseEntity {
  static validations = {
    userId: [is.required()],
    token: [is.required()],
  };

  @ObjectIdColumn()
  _id: string;

  @Column('varchar')
  userId: string;

  @Column('varchar')
  string: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserToken;
