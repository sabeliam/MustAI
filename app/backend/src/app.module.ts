import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {FilmsModule} from './films/films.module';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                console.log(configService.get('MONGODB_URI'))

                return {
                    uri: configService.get('MONGODB_URI'),
                }
            },
            inject: [ConfigService],
        }),
        PassportModule,
        AuthModule,
        UserModule,
        FilmsModule
    ],
})
export class AppModule {
}
