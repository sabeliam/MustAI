import {Film} from '@models';

export class ClearFilms {
    static readonly type = '[Films] ClearFilms'
}

export class GetFilms {
    static readonly type = '[Films] GetFilms';
}

export class AddFilm {
    static readonly type = '[Films] AddFilm';

    constructor(public film: Film) {
    }
}

export class SelectCurrentFilm {
    static readonly type = '[Films] SelectCurrentFilm';

    constructor(public filmId: string) {
    }
}

export class UpdateFilm {
    static readonly type = '[Films] UpdateFilm';

    constructor(public film: Partial<Film>) {
    }
}

export class RemoveFilm {
    static readonly type = '[Films] RemoveFilm';

    constructor(public id: string) {
    }
}

export class UpdateComment {
    static readonly type = '[Comments] UpdateComment';

    constructor(public comment: string) {
    }
}

export class AddComment {
    static readonly type = '[Comments] AddComment';

    constructor(public comment: string) {
    }
}

export class RemoveComment {
    static readonly type = '[Comments] RemoveComment';

    constructor(public filmId: string, public id: string) {
    }
}
