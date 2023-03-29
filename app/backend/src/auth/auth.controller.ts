import {ConflictException, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import {LocalAuthGuard} from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @Post('register')
    async register(@Request() req) {
        const {username, password} = req.body;

        if (!!await this.userService.existsByUsername(username)) {
            throw new ConflictException('User already exist');
        }

        const createdUser = await this.userService.create(username, password);
        return this.authService.login(createdUser);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('logout')
    async logout(@Request() req) {
        return
    }
}
