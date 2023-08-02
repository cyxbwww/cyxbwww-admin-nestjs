//permission.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {}

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const name = createPermissionDto.name;
    const existPermission = await this.permissionRepository.findOne({
      where: { name }
    });

    if (existPermission) throw new ApiException('权限字段已存在', ApiErrorCode.PERMISSSION_EXIST);
    return await this.permissionRepository.save(createPermissionDto);
  }

  async getPermissionList(params) {
    const { page, pageSize } = params;
    return await this.permissionRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize
    });
  }

  async updatePermission(params) {
    const { id } = params;
    const existPermission = await this.permissionRepository.findOne({
      where: { id }
    });

    try {
      await this.permissionRepository.save(Object.assign(existPermission, params));
      return '更新权限成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deletePermission(params) {
    try {
      const { id } = params;
      await this.permissionRepository.softDelete({ id });
      return '删除权限成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
