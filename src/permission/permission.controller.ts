import { Controller, Post, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { Permissions } from '../public/public.decorator';

@Controller('api/permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('createPermission')
  @Permissions('create')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @Post('getPermissionList')
  @Permissions('read')
  getPermissionList(@Body() params) {
    return this.permissionService.getPermissionList(params);
  }

  @Post('updatePermission')
  @Permissions('update')
  updatePermission(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.updatePermission(updatePermissionDto);
  }

  @Post('deletePermission')
  @Permissions('delete')
  deletePermission(@Body() params) {
    return this.permissionService.deletePermission(params);
  }
}
