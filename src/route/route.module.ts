import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [RouteController],
  providers: [RouteService],
  imports: [TypeOrmModule.forFeature([Route, User])]
})
export class RouteModule {}
