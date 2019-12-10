import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './dto/roles.dto';
import { QueryImplementation } from 'src/typings/query.implementation';
import { Role } from './interface/roles.interface';

@Controller('roles')
export class RolesController implements QueryImplementation<Role> {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
  @Post()
  create(@Body() role: RolesDto) {
    return this.roleService.create(role);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() role: RolesDto) {
    return this.roleService.update(id, role);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
