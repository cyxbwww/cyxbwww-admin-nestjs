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
  id: string; // 标记为主键，值自动生成

  @Column({ length: 30 })
  userName: string; // 用户名

  @Column()
  password: string; // 密码

  @Column({ nullable: true })
  phone: string; // 手机

  @Column({ nullable: true })
  avatar: string; // 头像

  @Column({ nullable: true })
  email: string; // 邮箱

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation'
  })
  roles: Role[]; // 角色

  @Column({ nullable: true })
  salt: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @DeleteDateColumn()
  deleteTime: Date;

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
