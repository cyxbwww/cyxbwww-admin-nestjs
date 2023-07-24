import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty({ message: '路由名称不可为空' })
  name: string;
  @IsNotEmpty({ message: '路由标题不可为空' })
  title: string;
  @IsNotEmpty({ message: '路由路径不可为空' })
  path: string;
  redirect: string;
  @IsNotEmpty({ message: '路由组件不可为空' })
  component: string;
  parentId: number;
  dynamicPath: string;
  requiresAuth: boolean;
  singleLayout: string;
  keepAlive: boolean;
  icon: string;
  hide: boolean;
  href: string;
  multiTab: boolean;
  order: number;
  activeMenu: string;
  createBy: string;
}
