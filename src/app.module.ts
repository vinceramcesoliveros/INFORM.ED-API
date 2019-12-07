import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/settings';
@Module({
  imports: [AccountsModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
