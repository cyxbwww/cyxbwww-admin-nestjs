import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('createRole')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Post('getRoleList')
  getRoleList() {
    return this.roleService.getRoleList();
  }
}
