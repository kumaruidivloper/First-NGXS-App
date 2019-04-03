import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UserState } from './../state/user.state';
import {Select, Store} from '@ngxs/store';
import { User } from './../models/user.model'
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DeleteUser, GetUsers, SetSelectedUser, AddUser} from './../actions/user.action';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Select(UserState.getUserList) users: Observable<User[]>;
    public isDisable: boolean = false;
    @Output() eventClicked = new EventEmitter<Boolean>();

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit() {
        this.store.dispatch(new GetUsers());
    }

    deleteUser(id: number) {
        this.eventClicked.emit(true);
        this.store.dispatch(new DeleteUser(id));
    }

    editUser(payload: User) {
        this.store.dispatch(new SetSelectedUser(payload));
    }

    userDetail(payload: User) {
        this.store.dispatch(new SetSelectedUser(payload));
    }

}
