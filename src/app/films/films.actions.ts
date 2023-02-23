import { Film } from '../models/index';

export class AddFilm {
    static readonly type = '[Films] AddFilm';

    constructor(public film: Film) {}
}

export class RemoveFilm {
    static readonly type = '[Films] RemoveFilm';

    constructor(public id: string) {}
}
