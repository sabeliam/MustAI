import {BaseItem} from '@models/base-item';
import {Comment} from '@models/comment';

export interface Film extends BaseItem {
    id: string;
    name: string;
    description: string;
    release_date?: string;
    first_air_date?: string;
    comments: Comment[];
}
