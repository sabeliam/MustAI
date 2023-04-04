import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {OpenaiService} from './openai.service';

@Controller('api/suggestions')
export class OpenaiController {
    constructor(private readonly openAI: OpenaiService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/filmSuggestions')
    async getCurrentUser(@Request() req, @Body() body: { prompt: string }): Promise<{ text: string }> {
        const response = await this.openAI.getCompletion(body.prompt);

        return {text: response.data.choices[0].text};
    }
}
