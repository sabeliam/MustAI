import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async create(username: string, password: string): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = new this.userModel({username, password: hashedPassword});
        return createdUser.save();
    }

    async findByUsername(username: string): Promise<User> {
        return this.userModel.findOne({username}).exec();
    }

    async existsByUsername(username: string): Promise<any> {
        return this.userModel.exists({username}).exec()
    }

    async findById(userId): Promise<User> {
        return this.userModel.findById(userId).exec()
    }
}
