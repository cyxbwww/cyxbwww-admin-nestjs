import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { Route } from '../route/entities/route.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Route)
    private routeRepository: Repository<Route>
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    // 查询传入数组 permissionIds 的全部 permission 实体
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.permissionIds)
      }
    });
    const name = createRoleDto.name;
    const existRole = await this.roleRepository.findOne({
      where: { name }
    });

    if (existRole) throw new ApiException('角色已存在', ApiErrorCode.ROLE_EXIST);

    try {
      await this.roleRepository.save({ permissions, name });
      return '添加角色成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getRoleList(params) {
    const { page, pageSize } = params;
    return await this.roleRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['permissions', 'routes']
    });
  }

  async updateRole(updateRoleDto: UpdateRoleDto) {
    const { id, name, permissionIds, routeIds } = updateRoleDto;
    delete updateRoleDto.permissionIds;
    delete updateRoleDto.routeIds;
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(permissionIds)
      }
    });
    const routes = await this.routeRepository.find({
      where: {
        id: In(routeIds)
      }
    });
    const existUser = await this.roleRepository.findOne({
      where: { id }
    });
    try {
      await this.roleRepository.save(
        Object.assign(existUser, {
          name,
          permissions,
          routes
        })
      );
      return '更新角色成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteRole(params) {
    try {
      const { id } = params;
      await this.roleRepository.softDelete({ id });
      return '删除角色成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
