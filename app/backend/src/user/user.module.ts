import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './user.schema';
import {UserController} from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    providers: [UserService],
    exports: [
        UserService,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    controllers: [UserController]
})
export class UserModule {
}
