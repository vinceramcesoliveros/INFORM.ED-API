import { Injectable } from '@nestjs/common';
import { Subject } from './interface/subject.interface';
import { Service } from 'src/typings/service.implementation';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectService implements Service<Subject, SubjectDto> {
  constructor(
    @InjectModel('subject') private readonly subjectModel: Model<Subject>,
  ) {}
  public async create(subjectDto: SubjectDto): Promise<Subject> {
    const createSubject = new this.subjectModel(subjectDto);
    const saveSubject = await createSubject.save();
    return saveSubject;
  }
  public async findAll(): Promise<Subject[]> {
    return await this.subjectModel.find().exec();
  }
  public async findOne(id: string): Promise<Subject> {
    return await this.subjectModel.findById({ _id: id }).exec();
  }
  public async update(id: string, subjectDto: SubjectDto): Promise<Subject> {
    return await this.subjectModel.findByIdAndUpdate(id, subjectDto).exec();
  }
  public async delete(id: string): Promise<Subject> {
    return await this.subjectModel.findOneAndDelete(id);
  }
}
