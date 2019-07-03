import { Component, TemplateRef, OnInit } from '@angular/core';
import { UserState } from './../state/user.state';
import { Select, Store } from '@ngxs/store';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteUser, GetUsers, SetSelectedUser } from './../actions/user.action';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    public gridLength: object;
    public modalRef: BsModalRef;
    public message: string;
    public selectedUser: number;
    public selectedId: number;

    @Select(UserState.getUserList) users: Observable<User[]>;

    constructor(
        private store: Store,
        private router: Router,
        private modalService: BsModalService) {
    }

    openModal(template: TemplateRef<any>, user: User) {
        this.selectedUser = user.userId;
        this.selectedId = user.id;
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
      }

    ngOnInit() {
        this.users.subscribe(res => {
            this.gridLength = res;
            console.log(this.gridLength);
        });
        this.store.dispatch(new GetUsers());
    }

    confirm(id: number): void {
        console.log(id);
        this.message = 'Confirmed!';
        this.modalRef.hide();
        this.store.dispatch(new DeleteUser(id));
      }

      decline(): void {
        this.message = 'Declined!';
        this.modalRef.hide();
      }

    // deleteUser(id: number) {
    //     this.selectedUser = id;
    // }

    editUser(payload: User) {
        this.store.dispatch(new SetSelectedUser(payload));
    }

    userDetail(payload: User) {
        this.store.dispatch(new SetSelectedUser(payload));
    }

}
