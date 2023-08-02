import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { Route } from '../../route/entities/route.entity';

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

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation'
  })
  permissions: Permission[];

  @ManyToMany(() => Route)
  @JoinTable({
    name: 'role_route_relation'
  })
  routes: Route[];
}
