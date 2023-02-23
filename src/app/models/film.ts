import { BaseItem } from '@models/base-item';

export interface Film extends BaseItem {
    id: string;
    name: string;
    description: string;
}
