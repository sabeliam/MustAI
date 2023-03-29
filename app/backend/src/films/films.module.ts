import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Film, FilmSchema} from './film.schema';
import {FilmsService} from './film.service';
import {UserModule} from '../user/user.module';
import {FilmsController} from './film.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Film.name, schema: FilmSchema}]),
        UserModule
    ],
    providers: [FilmsService],
    controllers: [FilmsController],
    exports: [FilmsService]
})
export class FilmsModule {
}
