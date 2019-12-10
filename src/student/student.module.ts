import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from 'src/database/schema/mongodb/student.schema';
import { AccountSchema } from 'src/database/schema/mongodb/account.schema';
import { AccountsService } from 'src/accounts/accounts.service';
import { RolesService } from 'src/roles/roles.service';
import { CourseService } from 'src/course/courses.service';
import { RoleSchema } from 'src/database/schema/mongodb/roles.schema';
import { CourseSchema } from 'src/database/schema/mongodb/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'student', schema: StudentSchema },
      { name: 'account', schema: AccountSchema },
      { name: 'role', schema: RoleSchema },
      { name: 'course', schema: CourseSchema },
    ]),
  ],
  providers: [StudentService, AccountsService, RolesService, CourseService],
  controllers: [StudentController],
})
export class StudentModule {}
