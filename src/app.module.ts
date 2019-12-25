import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { StudentModule } from './student/student.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { SubjectModule } from './subject/subject.module';
import { CourseModule } from './course/courses.module';
import { async } from 'rxjs/internal/scheduler/async';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Connection } from 'typeorm';
@Module({
  imports: [
    AccountsModule,
    RolesModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configSerivce: ConfigService) => ({
        uri: configSerivce.get('MONGODB_URI'),
      }),

      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(),
    CourseModule,
    StudentModule,
    ConfigModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
