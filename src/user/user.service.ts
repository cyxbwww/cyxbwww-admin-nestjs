import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    });

    if (!user) {
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username }
    });

    if (existUser) {
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    }

    try {
      const newUser = await this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      return '用户添加成功';
    } catch (e) {
      throw new ApiException(e, ApiErrorCode.INTERNAL_SERVER_ERROR);
    }
  }
}
