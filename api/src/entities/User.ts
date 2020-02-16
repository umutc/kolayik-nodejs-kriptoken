import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn} from 'typeorm';

import is from 'utils/validation';

@Entity()
class User extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    surname: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)],
    password: [is.required(), is.maxLength(200)],
  };

  @ObjectIdColumn()
  _id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

}

export default User;
