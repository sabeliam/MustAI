import {Module} from '@nestjs/common';
import {OpenaiController} from './openai.controller';
import {OpenaiService} from './openai.service';

@Module({
    imports: [],
    providers: [OpenaiService],
    exports: [],
    controllers: [OpenaiController]
})
export class OpenaiModule {
}
