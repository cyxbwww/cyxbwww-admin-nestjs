import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import encry from '../../utils/crypto';
import * as crypto from 'crypto';
import { Role } from '../../role/entities/role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: string; // 标记为主键，值自动生成

  @Column({ length: 30 })
  userName: string; // 用户名

  @Column()
  password: string; // 密码

  @Column()
  phone: string; // 手机

  @Column()
  email: string; // 邮箱

  @Column({ nullable: true })
  avatar: string; // 头像

  @Column({ default: '1' })
  userStatus: string; // 用户状态

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
    joinColumn: {
      name: 'userId'
    }
  })
  roles: Role[]; // 角色

  @Column({ nullable: true })
  salt: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
