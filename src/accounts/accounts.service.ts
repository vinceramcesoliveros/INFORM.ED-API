import { Injectable, BadRequestException } from '@nestjs/common';
import { Account } from './interface/accounts.interface';
import { AccountsDto } from './dto/account.dto';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueryImplementation } from 'src/typings/query.implementation';
import { FileFormat } from 'src/typings/file.interface';
import * as path from 'path';
@Injectable()
export class AccountsService implements QueryImplementation<Account> {
  constructor(
    @InjectModel('account')
    private readonly accountModel: Model<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountModel
      .find()
      .select('firstName middleName lastName gender role image')
      .populate('role', 'name')
      .exec();
  }

  async findOne(id: string) {
    return await this.accountModel
      .findById({ _id: id })
      .populate('role', 'name')
      .exec();
  }
  async create(account: AccountsDto) {
    const createAccount = new this.accountModel(account);
    const saveAccount = await createAccount.save();
    await saveAccount.populate('role').execPopulate();
    return saveAccount;
  }

  async update(id: string, account: AccountsDto) {
    return await this.accountModel
      .findByIdAndUpdate(id, account)
      .populate('role', 'name')
      .exec();
  }
  async delete(id: string) {
    return await this.accountModel.findByIdAndDelete(id).exec();
  }
  async insertImagePath(id: string, filePath: FileFormat) {
    return await this.accountModel
      .findByIdAndUpdate(id, {
        image: `uploads/${id}/${filePath.filename}`,
      })
      .exec();
  }
}
