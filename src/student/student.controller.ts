import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { QueryImplementation } from 'src/typings/query.implementation';
import { Student } from './interface/student.interface';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { RolesService } from 'src/roles/roles.service';
import { CourseService } from 'src/course/courses.service';
import { ModelValidation } from '../validation/model.validation';

@Controller('student')
export class StudentController implements QueryImplementation<Student> {
  private readonly serviceValidation = [
    { schema: 'account', service: this.accountService },
    { schema: 'role', service: this.roleService },
    { schema: 'course', service: this.courseService },
  ];
  @Post()
  async create(@Body() studentDto: StudentDto): Promise<Student> {
    const studentValidation = new ModelValidation({
      dataTransferObject: studentDto,
      serviceValidation: this.serviceValidation,
    });
    studentValidation.serviceExists();
    return this.studentService.create(studentDto);
  }
  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student> {
    const studentValidation = new ModelValidation();
    return studentValidation.validateId({
      id,
      service: this.studentService,
      type: 'findOne',
    });
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() studentDto: StudentDto,
  ): Promise<Student> {
    const studentValidation = new ModelValidation({
      dataTransferObject: studentDto,
      serviceValidation: this.serviceValidation,
    });

    // studentValidation.validate({ column: studentDto.role, value: 'Student' });
    studentValidation.serviceExists();
    return studentValidation.validateId({
      id,
      service: this.studentService,
      type: 'update',
      body: studentDto,
    });
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Student> {
    const studentValidation = new ModelValidation();
    return await studentValidation.validateId({
      id,
      service: this.studentService,
      type: 'delete',
    });
  }
  constructor(
    private readonly studentService: StudentService,
    private readonly accountService: AccountsService,
    private readonly roleService: RolesService,
    private readonly courseService: CourseService,
  ) {}
}
