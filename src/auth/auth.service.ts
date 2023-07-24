import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import encry from '../utils/crypto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { userName, password } = loginAuthDto;
    const userInfo = await this.userService.findOne(userName);

    if (userInfo?.password !== encry(password, userInfo.salt)) {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: userInfo.userName, sub: userInfo.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      userInfo,
      token
    };
  }
}
