import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { userName, password, phone, email, userStatus, userRoleIds } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { userName }
    });

    if (existUser) {
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    }

    try {
      // 查询数组 userRoleIds 对应所有 role 的实例
      const roles = await this.roleRepository.find({
        where: {
          id: In(userRoleIds)
        }
      });
      const newUser = await this.userRepository.create({
        userName,
        password,
        phone,
        email,
        userStatus,
        roles
      });
      await this.userRepository.save(newUser);

      return '用户添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const { userId, userName, password, phone, email, userStatus, userRoleIds } = updateUserDto;
    delete updateUserDto.userRoleIds;
    const roles = await this.roleRepository.find({
      where: {
        id: In(userRoleIds)
      }
    });
    const existUser = await this.userRepository.findOne({
      where: { userId }
    });

    await this.userRepository.save(
      Object.assign(existUser, {
        userName,
        password,
        phone,
        email,
        userStatus,
        roles
      })
    );

    return '更新用户成功';
  }

  async findOne(userName: string) {
    const user = await this.userRepository.findOne({
      where: { userName }
    });

    if (!user) {
      throw new ApiException('用户名不存在', ApiErrorCode.USER_NOTEXIST);
    }

    return user;
  }

  async findPermissionNames(token: string, userInfo) {
    const user = await this.userRepository.findOne({
      where: { userName: userInfo.userName },
      relations: ['roles', 'roles.permissions']
    });
    if (user) {
      const permissions = user.roles.flatMap(role => role.permissions);
      const permissionNames = permissions.map(item => item.name);
      return [...new Set(permissionNames)];
    } else {
      return [];
    }
  }

  async getUserList(params) {
    const { page, pageSize } = params;

    return await this.userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['roles'],
      withDeleted: true
    });
  }

  async deleteUser(params) {
    try {
      const { userId } = params;
      await this.userRepository.softDelete({ userId });
      return '删除成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
