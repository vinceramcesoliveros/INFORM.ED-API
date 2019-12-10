import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './interface/student.interface';
import { QueryImplementation } from 'src/typings/query.implementation';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentService implements QueryImplementation<Student> {
  constructor(
    @InjectModel('student') private readonly studentModel: Model<Student>,
  ) {}
  async create(studentDto: StudentDto): Promise<Student> {
    const createStudent = new this.studentModel(studentDto);
    const saveStudent = await createStudent.save();
    await saveStudent
      .populate('role')
      .populate('course')
      .populate('account')
      .execPopulate();
    return saveStudent;
  }
  async findAll(): Promise<Student[]> {
    return await this.studentModel
      .find()
      .populate('role')
      .populate('course')
      .populate('account')
      .exec();
  }
  async findOne(id: string): Promise<Student> {
    return await this.studentModel
      .findById({ _id: id })
      .populate('role')
      .populate('course')
      .populate('account')
      .exec();
  }
  async update(id: string, studentDto: StudentDto): Promise<Student> {
    return await this.studentModel
      .findByIdAndUpdate(id, studentDto)
      .populate('role')
      .populate('course')
      .populate('account')
      .exec();
  }
  async delete(id: string): Promise<Student> {
    return await this.studentModel.findByIdAndDelete(id);
  }
}
