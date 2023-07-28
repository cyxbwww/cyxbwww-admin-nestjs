import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Permissions } from '../public/public.decorator';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  @Permissions('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('updateUser')
  @Permissions('update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Post('getUserList')
  getUserList(@Body() params) {
    return this.userService.getUserList(params);
  }

  @Post('deleteUser')
  @Permissions('delete')
  deleteUser(@Body() params) {
    return this.userService.deleteUser(params);
  }
}
