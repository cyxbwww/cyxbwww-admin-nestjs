import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiException } from '../common/filter/http-exception/api.exception';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
import { convertToTree } from '../utils/convertToTree';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    try {
      await this.routeRepository.save(createRouteDto);
    } catch (error) {
      throw new ApiException(error, ApiErrorCode.DATABASE_ERROR);
    }
    return '操作成功';
  }

  async getUserRoutes(params) {
    const { userId } = params;
    const userList: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.routes', 'route')
      .where({ userId })
      .orderBy('route.order', 'ASC')
      .getOne();

    const routeList = userList?.roles[0].routes.map(v => {
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
      routes: convertToTree(routeList)
    };
  }

  async getRouteList() {
    const route = await this.routeRepository.find();
    const routeList = route.map(v => {
      const { id, parentId, name, path, component, title, icon, order, requiresAuth, hide } = v;
      const route = {
        id,
        name,
        title,
        path,
        component,
        parentId
      };
      const routeMeta = {
        icon,
        requiresAuth,
        hide
      };

      Object.assign(parentId ? routeMeta : route, { order });

      return Object.assign(route, {
        meta: routeMeta
      });
    });

    return convertToTree(routeList);
  }
}
