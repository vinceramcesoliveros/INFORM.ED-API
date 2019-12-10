import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/database/schema/mongodb/roles.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'role', schema: RoleSchema }])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
