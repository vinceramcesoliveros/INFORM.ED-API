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

@Controller('student')
export class StudentController implements QueryImplementation<Student> {
  @Post()
  create(@Body() studentDto: StudentDto): Promise<Student> {
    this.validateIfExists(studentDto);
    return this.studentService.create(studentDto);
  }
  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student> {
    this.validateId(id);
    return this.studentService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() studentDto: StudentDto,
  ): Promise<Student> {
    this.validateId(id);
    this.validateIfExists(studentDto);
    return this.studentService.update(id, studentDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Student> {
    this.validateId(id);
    return this.studentService.delete(id);
  }
  private validateIfExists(studentDto: StudentDto) {
    const errors = [];
    if (!this.accountService.findOne(studentDto.account)) {
      errors.push({
        name: 'account',
        message: `Account: ${studentDto.account} not found`,
      });
    }
    if (!this.roleService.findOne(studentDto.role)) {
      errors.push({
        name: 'role',
        message: `Role: ${studentDto.role} not found`,
      });
    }
    if (!this.courseService.findOne(studentDto.course)) {
      errors.push({
        name: 'course',
        message: `Role: ${studentDto.course} not found`,
      });
    }
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.NOT_FOUND);
    }
  }
  private validateId(id: string) {
    if (!id) {
      throw new BadRequestException('Id must be provided');
    }
  }
  constructor(
    private readonly studentService: StudentService,
    private readonly accountService: AccountsService,
    private readonly roleService: RolesService,
    private readonly courseService: CourseService,
  ) {}
}
