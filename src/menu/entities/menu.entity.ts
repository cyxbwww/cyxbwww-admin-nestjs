import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string; // 路由名称

  @Column()
  path: string; // 路由路径

  @Column({ default: '/' })
  redirect: string; // 路由重定向

  @Column()
  component: string; // 路由组件

  @Column({ nullable: true })
  parentId: number; // 父id

  @Column()
  title: string; // 路由标题

  @Column({ nullable: true })
  dynamicPath: string; // 路由的动态路径

  @Column({ default: true })
  requiresAuth: boolean; // 是否需要登录权限

  @Column({ nullable: true })
  singleLayout: string; // 作为单级路由的父级路由布局组件

  @Column({ default: false })
  keepAlive: boolean; // 缓存页面

  @Column({ nullable: true })
  icon: string; // 菜单和面包屑对应的图标(iconify图标名称)

  @Column({ default: false })
  hide: boolean; // 是否在菜单中隐藏

  @Column({ nullable: true })
  href: string; // 外链链接

  @Column({ nullable: true })
  multiTab: boolean; // 是否支持多个tab页签

  @Column()
  order: number; // 路由顺序，可用于菜单的排序

  @Column({ nullable: true })
  activeMenu: string; // 当前路由需要选中的菜单项(用于跳转至不在左侧菜单显示的路由且需要高亮某个菜单的情况)

  @Column({ nullable: true })
  createBy: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
