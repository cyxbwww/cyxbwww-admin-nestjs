import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { Menu } from '../../menu/entities/menu.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation'
  })
  permissions: Permission[];

  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'role_menu_relation'
  })
  menus: Menu[];
}
