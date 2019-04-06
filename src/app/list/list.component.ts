import { Component } from '@angular/core';
import { UserState } from './../state/user.state';
import { Select, Store } from '@ngxs/store';
import { User } from './../models/user.model'
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { DeleteUser, GetUsers, SetSelectedUser } from './../actions/user.action';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    public gridLength: object;
    @Select(UserState.getUserList) users: Observable<User[]>;

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit() {
        this.users.subscribe(res => {
            this.gridLength = res;
        })
        this.store.dispatch(new GetUsers());
    }

    deleteUser(id: number) {
        this.store.dispatch(new DeleteUser(id));
    }

    editUser(payload: User) {
        this.store.dispatch(new SetSelectedUser(payload));
    }

    userDetail(payload: User) {
        this.store.dispatch(new SetSelectedUser(payload));
    }

}
