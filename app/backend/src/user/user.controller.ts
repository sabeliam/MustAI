import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {UserService} from './user.service';

@Controller()
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @Post('register')
    async register(@Request() req) {
        const {email, password} = req.body;
        const createdUser = await this.userService.create(email, password);
        return this.authService.login(createdUser);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
