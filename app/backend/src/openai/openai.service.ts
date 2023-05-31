import {Injectable} from '@nestjs/common';
import {Configuration, CreateCompletionRequest, OpenAIApi} from 'openai';

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
        const prompt = `
        generate a list of 10 films with authors and genres with tags that i provide, tags delimited by triple quotes
        respond only with JSON, do not add comments, only plain JSON
            '''${ask}'''

        Provide them in JSON format with the following keys:
        title, author, genre.`

        const options: CreateCompletionRequest = {
            model: Model.Davinci,
            prompt,
            temperature: 0.7,
            max_tokens: 1000,
        }

        return this.openai.createCompletion(options);
    }
}
