import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {JwtPayload} from './jwt-payload.interface';
import {UserService} from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: JwtPayload) {
        const {sub: userId} = payload;
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
