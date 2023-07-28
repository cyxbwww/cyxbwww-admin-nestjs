export class CreateUserDto {
  userName: string;
  password: string;
  phone: string;
  email: string;
  userStatus: string;
  userRoleIds: number[];
}
