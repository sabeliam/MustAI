import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {FilmsModule} from './films/films.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {OpenaiModule} from './openai/openai.module';
import {DescriptionModule} from './description/description.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    uri: configService.get('MONGODB_URI'),
                }
            },
            inject: [ConfigService],
        }),
        PassportModule,
        AuthModule,
        UserModule,
        FilmsModule,
        OpenaiModule,
        DescriptionModule
    ],
})
export class AppModule {
}
