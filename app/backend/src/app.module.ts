import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {FilmsModule} from './films/films.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
        PassportModule,
        AuthModule,
        UserModule,
        FilmsModule
    ],
})
export class AppModule {
}
