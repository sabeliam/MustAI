import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {User} from '@models/user';
import {ClearUser, GetUser, SelectUser} from '@core/user/store/user.actions';
import {UserService} from '@core/user/services/user.service';
import {Observable} from 'rxjs';

export interface UserStateModel {
    currentUser: User | null;
}

const defaultUserState: UserStateModel = {
    currentUser: null,
};

@State<UserStateModel>({
    name: 'user',
    defaults: defaultUserState,
})
@Injectable()
export class UserState {
    constructor(private readonly userService: UserService) {
    }

    @Selector()
    public static currentUser(state: UserStateModel): User | null {
        return state.currentUser || null;
    }

    @Action(SelectUser)
    selectUser({setState}: StateContext<UserStateModel>, action: SelectUser): UserStateModel {
        return setState({currentUser: action.user});
    }

    @Action(ClearUser)
    clearStore({setState}: StateContext<UserStateModel>): UserStateModel {
        return setState(defaultUserState);
    }

    @Action(GetUser)
    getUser({setState}: StateContext<UserStateModel>): any {
        return this.userService.getUser().subscribe((user) => {
            setState({currentUser: user});
        });
    }
}
