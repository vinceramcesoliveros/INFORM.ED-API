import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/settings';
import { RolesModule } from './roles/roles.module';
import { CourseModule } from './course/courses.module';
import { StudentModule } from './student/student.module';
@Module({
  imports: [
    AccountsModule,
    RolesModule,
    MongooseModule.forRoot(config.mongoURI),
    CourseModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
