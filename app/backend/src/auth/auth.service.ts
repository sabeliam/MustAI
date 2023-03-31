import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from '../user/user.schema';
import {UserService} from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = {username: user.username, sub: user._id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
