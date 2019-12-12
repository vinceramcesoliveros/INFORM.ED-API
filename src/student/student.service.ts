import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './interface/student.interface';
import { QueryImplementation } from 'src/typings/query.implementation';
import { StudentDto } from './dto/student.dto';
import { Service } from 'src/typings/service.implementation';

@Injectable()
export class StudentService implements Service<Student> {
  constructor(
    @InjectModel('student') private readonly studentModel: Model<Student>,
  ) {}
  async create(studentDto: StudentDto): Promise<Student> {
    const createStudent = new this.studentModel(studentDto);
    const saveStudent = await createStudent.save();
    await saveStudent
      .populate('course')
      .populate({ path: 'account', populate: { path: 'role' } })
      .execPopulate();
    return saveStudent;
  }
  async findAll(): Promise<Student[]> {
    return await this.studentModel
      .find()
      .select('-createdAt -updatedAt')
      .populate('course', 'name description creditUnits')
      .populate({
        path: 'account',
        select: 'firstName middleName lastName gender',
        populate: { path: 'role', select: 'name' },
      })
      .exec();
  }
  async findOne(id: string): Promise<Student> {
    return await this.studentModel
      .findById({ _id: id })
      .populate('course', 'name description creditUnits')
      .populate({
        path: 'account',
        select: 'firstName middleName lastName gender',
        populate: { path: 'role', select: 'name' },
      })
      .exec();
  }
  async update(id: string, studentDto: StudentDto): Promise<Student> {
    return await this.studentModel
      .findByIdAndUpdate(id, studentDto)
      .populate('course')
      .populate({ path: 'account', populate: { path: 'role' } })
      .exec();
  }
  async delete(id: string): Promise<Student> {
    return await this.studentModel.findByIdAndDelete(id);
  }
}
