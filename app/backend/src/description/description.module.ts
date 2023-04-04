import {Module} from '@nestjs/common';
import {DescriptionController} from './description.controller';
import {DescriptionService} from './description.service';

@Module({
    imports: [],
    providers: [DescriptionService],
    exports: [],
    controllers: [DescriptionController]
})
export class DescriptionModule {
}
