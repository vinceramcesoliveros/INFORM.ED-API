import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileFormat } from 'src/typings/file.interface';
import { QueryImplementation } from 'src/typings/query.implementation';
import { AccountsDto } from './dto/account.dto';
import { Account } from './interface/accounts.interface';
import { Service } from 'src/typings/service.implementation';
@Injectable()
export class AccountsService implements Service<Account> {
  constructor(
    @InjectModel('account')
    private readonly accountModel: Model<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountModel
      .find()
      .select('-createdAt -updatedAt -password')
      .populate('role', 'name')
      .exec();
  }

  async findOne(id: string) {
    return await this.accountModel
      .findById({ _id: id })
      .select('-createdAt -updatedAt -password')
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
      .select('-createdAt -updatedAt -password')
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
