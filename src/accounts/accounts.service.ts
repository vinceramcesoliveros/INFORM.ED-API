import { Injectable } from '@nestjs/common';
import { Account } from './interface/accounts.interface';
import { AccountsDto } from './dto/accounts.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('accounts') private readonly accountModel: Model<Account>,
  ) {}

  async findAll() {
    return await this.accountModel.find().exec();
  }

  async findOne(id: string) {
    return await this.accountModel.findById({ _id: id }).exec();
  }
  async create(account: AccountsDto) {
    const createAccount = new this.accountModel(account);
    return await createAccount.save();
  }

  async update(id: string, account: AccountsDto) {
    return await this.accountModel.findByIdAndUpdate(id, account).exec();
  }
  async delete(id: string) {
    return await this.accountModel.findByIdAndDelete(id).exec();
  }
}
