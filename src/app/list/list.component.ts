import {Component, OnInit} from '@angular/core';
import { UserState } from './../state/user.state';
import {Select, Store} from '@ngxs/store';
import { User } from './../models/user.model'
import {Observable} from 'rxjs';
import {DeleteUser, GetUsers, SetSelectedUser} from './../actions/user.action';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Select(UserState.getUserList) users: Observable<User[]>;
    public isDisable: boolean = false;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new GetUsers());
    }

    deleteUser(id: number) {
        this.store.dispatch(new DeleteUser(id));
    }

    editUser(payload: User) {
        console.log(payload);
        // this.isDisable = true;
        this.store.dispatch(new SetSelectedUser(payload));
    }

}
