import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Post,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsDto } from './dto/accounts.dto';
import { AccountsPipe } from 'src/accounts.pipe';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  async findAll() {
    return await this.accountService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.validateId(id);
    return await this.accountService.findOne(id);
  }

  @Post()
  @UsePipes(new AccountsPipe())
  async createAccount(@Body() createAccountDto: AccountsDto) {
    return await this.accountService.create(createAccountDto);
  }

  @Put(':id')
  @UsePipes(new AccountsPipe())
  async update(@Param('id') id: string, @Body() account: AccountsDto) {
    this.validateId(id);
    return await this.accountService.update(id, account);
  }

  @Delete(':id')
  async deleteAccount(@Param() id: string) {
    this.validateId(id);
    return await this.accountService.delete(id);
  }

  private validateId(id: string) {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }
  }
}
