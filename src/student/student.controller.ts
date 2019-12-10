import {
  Controller,
  Post,
  NotFoundException,
  HttpException,
  BadRequestException,
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
import { StudentValidation } from './validation/student.validation';

@Controller('student')
export class StudentController implements QueryImplementation<Student> {
  private readonly schemaServices = Object.freeze([
    { schema: 'account', service: this.accountService },
    { schema: 'role', service: this.roleService },
    { schema: 'course', service: this.courseService },
  ]);
  @Post()
  async create(@Body() studentDto: StudentDto): Promise<Student> {
    const studentValidation = new StudentValidation(studentDto);
    studentValidation.serviceExists(this.schemaServices);

    const studentRole = await this.roleService.findOne(studentDto.role);
    studentValidation.validateStudentRole(studentRole.name);
    return this.studentService.create(studentDto);
  }
  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() studentDto: StudentDto,
  ): Promise<Student> {
    const studentValidation = new StudentValidation(studentDto);
    studentValidation.validateId(id);
    studentValidation.validateStudentRole(studentDto.role);
    studentValidation.serviceExists(this.schemaServices);
    return this.studentService.update(id, studentDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Student> {
    const studentValidation = new StudentValidation();
    studentValidation.validateId(id);
    return this.studentService.delete(id);
  }
  constructor(
    private readonly studentService: StudentService,
    private readonly accountService: AccountsService,
    private readonly roleService: RolesService,
    private readonly courseService: CourseService,
  ) {}
}
