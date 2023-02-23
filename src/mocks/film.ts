import { Film } from '@models';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export const mockFilm: () => Film = () => ({
    id: uuidv4(),
    name: faker.music.songName(),
    description: faker.random.words(15),
});
