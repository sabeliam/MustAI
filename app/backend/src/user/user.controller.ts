import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from '../auth/local-auth.guard';
import {AuthGuard} from '@nestjs/passport';

@Controller('api/user')
export class UserController {
    constructor() {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getCurrentUser(@Request() req) {
        return req.user;
    }
}
