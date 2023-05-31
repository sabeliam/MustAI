import {User} from '@models/user';

export class SelectUser {
    static readonly type = '[User] SelectUser'

    constructor(public user: User) {
    }
}

export class ClearUser {
    static readonly type = '[User] ClearUser'
}

export class GetUser {
    static readonly type = '[User] GetUser'
}
