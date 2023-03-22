import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async create(email: string, password: string): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = new this.userModel({email, password: hashedPassword});
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email}).exec();
    }
}
