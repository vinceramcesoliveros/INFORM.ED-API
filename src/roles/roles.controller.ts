import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './dto/roles.dto';
import { QueryImplementation } from 'src/typings/query.implementation';
import { Role } from './interface/roles.interface';
import { RolesInterceptor } from './roles.interceptor';
@Controller('roles')
export class RolesController implements QueryImplementation<Role, RolesDto> {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
  @UseInterceptors(new RolesInterceptor())
  @Post()
  create(@Body() role: RolesDto) {
    return this.roleService.create(role);
  }
  @UseInterceptors(new RolesInterceptor())
  @Put(':id')
  update(@Param('id') id: string, @Body() role: RolesDto) {
    return this.roleService.update(id, role);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
