import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';
import {LocalStrategy} from './local.strategy';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'},
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy
    ],
})
export class AuthModule {
}
