import {SearchResult} from '@models/tmdb';
import {Film} from '@models';

export function fromSearchResultToFilm(object: SearchResult): Film {
    return {
        id: String(object.id),
        name: object.title,
        description: object.overview,
        imgUrl: getImgUrl(object.poster_path),
        comments: [],
    };
}


export function getImgUrl(poster_path: string | null): string | null {
    if (!poster_path) {
        return null;
    }

    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
}
