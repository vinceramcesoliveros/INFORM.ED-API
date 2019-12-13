import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QueryImplementation } from 'src/typings/query.implementation';
import { Course } from './interfaces/course.interface';
import { CourseService } from './courses.service';
import { CourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController
  implements QueryImplementation<Course, CourseDto> {
  constructor(private readonly courseService: CourseService) {}
  @Post()
  create(@Body() courseDto: CourseDto): Promise<Course> {
    return this.courseService.create(courseDto);
  }
  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() courseDto: CourseDto,
  ): Promise<Course> {
    return this.courseService.update(id, courseDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Course> {
    return this.courseService.delete(id);
  }
}
