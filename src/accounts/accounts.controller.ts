import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Post,
  BadRequestException,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsDto } from './dto/account.dto';
import { Account } from './interface/accounts.interface';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FileFormat } from 'src/typings/file.interface';
import { diskStorage } from 'multer';
import { fileName, fileDestination } from './fileUpload';
import { Response } from 'express';
import { join } from 'path';
import { QueryImplementation } from 'src/typings/query.implementation';
@Controller('accounts')
export class AccountsController
  implements QueryImplementation<Account, AccountsDto> {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  findAll(): Promise<Account[]> {
    return this.accountService.findAll();

    // return JSON.stringify(accountToString);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.validateId(id);
    const foundAccount = await this.accountService.findOne(id);
    if (!foundAccount) {
      throw new NotFoundException(`Account: ${id} not found`);
    }
    return foundAccount;
  }

  @Post()
  create(@Body() createAccountDto: AccountsDto): Promise<Account> {
    try {
      return this.accountService.create(createAccountDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() account: AccountsDto,
  ): Promise<Account> {
    this.validateId(id);
    if (!(await this.accountService.findOne(id))) {
      throw new NotFoundException(`Account:${id} not found`);
    }
    return this.accountService.update(id, account);
  }

  @Delete(':id')
  async delete(@Param() id: string): Promise<Account> {
    this.validateId(id);

    if (!(await this.accountService.findOne(id))) {
      throw new NotFoundException(`Account:${id} not found`);
    }
    return this.accountService.delete(id);
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: fileName,
        destination: fileDestination,
      }),
    }),
  )
  uploadFile(
    @Param('id') id: string,
    @UploadedFile()
    file: FileFormat,
  ) {
    // this.accountService.insertImagePath(id, file);
    return this.accountService.insertImagePath(id, file);
  }
  @Get('/uploads/:id/:imgPath')
  getImageId(
    @Param('id') id: string,
    @Param('imgPath') imgPath: string,
    @Res() response: Response,
  ) {
    console.log(imgPath, id);
    return response.sendFile(
      join(__dirname, '..', 'public', 'uploads', id, imgPath),
    );
  }
  private validateId(id: string) {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }
  }
}
