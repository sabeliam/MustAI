import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {DescriptionService} from './description.service';

@Controller('api/description')
export class DescriptionController {
    constructor(private readonly descriptionService: DescriptionService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/findFilmByName')
    async findFilmByName(@Query('query') query): Promise<string> {
        const response = await this.descriptionService.findFilmByName(query);

        return response.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/findFilmByImdbId:id')
    async findFilmByImdbId(@Param() id): Promise<string> {
        const response = await this.descriptionService.findFilmByImdbId(id);

        return response.data;
    }
}
