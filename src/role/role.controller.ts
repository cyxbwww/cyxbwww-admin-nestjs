import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Permissions } from '../public/public.decorator';

@Controller('api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('createRole')
  @Permissions('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Post('getRoleList')
  @Permissions('read')
  getRoleList(@Body() params) {
    return this.roleService.getRoleList(params);
  }

  @Post('updateRole')
  @Permissions('update')
  updateRole(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(updateRoleDto);
  }

  @Post('deleteRole')
  @Permissions('delete')
  deleteRole(@Body() params) {
    return this.roleService.deleteRole(params);
  }
}
