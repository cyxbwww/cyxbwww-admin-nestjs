import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiException } from '../common/filter/http-exception/api.exception';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { convertToTree } from '../utils/convertToTree';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    try {
      await this.menuRepository.save(createMenuDto);
    } catch (error) {
      throw new ApiException(error, ApiErrorCode.DATABASE_ERROR);
    }
    return '操作成功';
  }

  async findMenu({ userId }) {
    const userList: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where({ userId })
      .orderBy('menu.order', 'ASC')
      .getOne();

    const menuList = userList?.roles[0].menus.map(v => {
      const { id, parentId, name, path, component, title, icon, order, requiresAuth, hide } = v;
      const route = {
        id,
        name,
        path,
        component,
        parentId
      };
      const routeMeta = {
        title,
        icon,
        requiresAuth,
        hide
      };

      Object.assign(parentId ? routeMeta : route, { order });

      return Object.assign(route, {
        meta: routeMeta
      });
    });

    return {
      home: 'dashboard_analysis',
      routes: convertToTree(menuList)
    };
  }
}
