import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Controller('api/user')
export class UserController {
    constructor() {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getCurrentUser(@Request() req): Promise<any> {
        return {
            username: req.user.username,
        };
    }
}
