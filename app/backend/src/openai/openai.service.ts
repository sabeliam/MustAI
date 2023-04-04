import {Injectable} from '@nestjs/common';
import {OpenAIApi, Configuration, CreateCompletionRequest} from 'openai';

enum Model {
    Сurie = 'text-curie-001',
    Davinci = 'text-davinci-003',
    Ada = 'text-ada-001',
    Babbage = 'text-babbage-001',
}

@Injectable()
export class OpenaiService {
    private openai: OpenAIApi;

    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPEN_AI_SECRET,
        });

        this.openai = new OpenAIApi(configuration);
    }

    async getCompletion(ask: string): Promise<any> {
        const prompt = `Give me list of films with tags: ${ask}, add to list their imdb id`;

        const options: CreateCompletionRequest = {
            model: Model.Davinci,
            prompt,
            temperature: 0.7,
            max_tokens: 1000,
        }

        return this.openai.createCompletion(options);
    }
}
