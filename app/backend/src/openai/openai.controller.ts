import {Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {OpenaiService} from './openai.service';

@Controller('api/suggestions')
export class OpenaiController {
    constructor(private readonly openAI: OpenaiService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/filmSuggestions')
    async getCurrentUser(@Request() req, @Body() body: { prompt: string }): Promise<{ text: string }> {
        const response = await this.openAI.getCompletion(body.prompt).catch((e) => {
            throw new HttpException({reason: e.message}, HttpStatus.INTERNAL_SERVER_ERROR);
        });

        return {text: response.data.choices[0].text};
    }
}
