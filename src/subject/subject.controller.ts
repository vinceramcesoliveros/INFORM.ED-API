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
import { Subject } from './interface/subject.interface';
import { SubjectDto } from './dto/subject.dto';
import { SubjectService } from './subject.service';
import { ModelValidation } from 'src/validation/model.validation';

@Controller('subject')
export class SubjectController
  implements QueryImplementation<Subject, SubjectDto> {
  private readonly subjectValidation = new ModelValidation();
  constructor(private readonly subjectService: SubjectService) {}
  @Post()
  public create(@Body() subjectDto: SubjectDto): Promise<Subject> {
    return this.subjectService.create(subjectDto);
  }
  @Get()
  public findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Subject> {
    return this.subjectValidation.validateId({
      id,
      service: this.subjectService,
      type: 'findOne',
    });
  }
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() subjectDto: SubjectDto,
  ): Promise<Subject> {
    return this.subjectValidation.validateId({
      id,
      service: this.subjectService,
      type: 'update',
      body: subjectDto,
    });
  }
  @Delete(':id')
  public delete(@Param('id') id: string): Promise<Subject> {
    return this.subjectValidation.validateId({
      id,
      type: 'delete',
      service: this.subjectService,
    });
  }
}
