import { Controller, Post, Body } from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';

@Controller('api/route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @Post('getUserRoutes')
  getUserRoutes(@Body() params) {
    return this.routeService.getUserRoutes(params);
  }

  @Post('getRouteList')
  getRouteList() {
    return this.routeService.getRouteList();
  }
}
