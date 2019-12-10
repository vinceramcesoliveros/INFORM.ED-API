import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from '../database/schema/mongodb/account.schema';
import { RoleSchema } from 'src/database/schema/mongodb/roles.schema';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.register({ dest: './dist/public/uploads' }),
    MongooseModule.forFeature([
      { name: 'account', schema: AccountSchema },
      { name: 'role', schema: RoleSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
