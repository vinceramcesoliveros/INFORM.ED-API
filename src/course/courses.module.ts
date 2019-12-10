import { Module } from '@nestjs/common';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from 'src/database/schema/mongodb/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'course', schema: CourseSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
