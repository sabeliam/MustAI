import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {User, UserSchema} from './user/user.schema';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';
import {LocalStrategy} from './user/local.strategy';
import {AuthService} from './user/auth.service';
import {JwtStrategy} from './user/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'},
        }),
    ],
    controllers: [UserController],
    providers: [UserService, LocalStrategy, AuthService, JwtStrategy],
})
export class AppModule {
}
