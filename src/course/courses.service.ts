import { Injectable } from '@nestjs/common';
import { QueryImplementation } from 'src/typings/query.implementation';
import { Course } from './interfaces/course.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDto } from './dto/course.dto';
@Injectable()
export class CourseService implements QueryImplementation<Course> {
  constructor(
    @InjectModel('course') private readonly courseModel: Model<Course>,
  ) {}
  async create(courseDto: CourseDto): Promise<Course> {
    const createCourse = new this.courseModel(courseDto);
    return await createCourse.save();
  }
  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().exec();
  }
  async findOne(id: string): Promise<Course> {
    return await this.courseModel.findById({ _id: id }).exec();
  }
  async update(id: string, courseDto: CourseDto): Promise<Course> {
    return await this.courseModel.findByIdAndUpdate(id, courseDto);
  }
  async delete(id: string): Promise<Course> {
    return await this.courseModel.findByIdAndRemove(id);
  }
}
