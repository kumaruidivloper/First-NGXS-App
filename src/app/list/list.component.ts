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
    @Select(UserState.getUserList) todos: Observable<User[]>;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new GetUsers());
    }

    deleteTodo(id: number) {
        this.store.dispatch(new DeleteUser(id));
    }

    editTodo(payload: User) {
        this.store.dispatch(new SetSelectedUser(payload));
    }

}
