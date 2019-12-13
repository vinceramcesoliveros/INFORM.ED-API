import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './interface/roles.interface';
import { RolesDto } from './dto/roles.dto';
import { Service } from 'src/typings/service.implementation';

@Injectable()
export class RolesService implements Service<Role, RolesDto> {
  constructor(@InjectModel('role') private readonly roleModel: Model<Role>) {}

  async findAll() {
    return await this.roleModel.find().exec();
  }
  async create(role: RolesDto) {
    const createRole = new this.roleModel(role);
    return createRole.save();
  }
  async findOne(id: string) {
    return await this.roleModel.findById({ _id: id }).exec();
  }

  async update(id: string, role: RolesDto) {
    return await this.roleModel.findByIdAndUpdate(id, role).exec();
  }
  async delete(id: string) {
    return await this.roleModel.findByIdAndDelete({ _id: id }).exec();
  }
}
