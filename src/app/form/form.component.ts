import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import { UserState } from './../state/user.state';
import {AddUser, SetSelectedUser, UpdateUser} from './../actions/user.action';
import {Observable} from 'rxjs';
import {User} from './../models/user.model';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    @Select(UserState.getSelectedUser) selectedUser: Observable<User>;
    userForm: FormGroup;
    editUser = false;

    constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
        this.createForm();
    }

    ngOnInit() {
        this.selectedUser.subscribe(user => {
            if (user) {
                this.userForm.patchValue({
                    id: user.id,
                    userId: user.userId,
                    name: user.name
                });
                this.editUser = true;
            } else {
                this.editUser = false;
            }
        });
    }

    createForm() {
        this.userForm = this.fb.group({
            id: [''],
            userId: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.editUser) {
            this.store.dispatch(new UpdateUser(this.userForm.value, this.userForm.value.id)).subscribe(() => {
                this.clearForm();
            });
        } else if(this.userForm.value.userId != null){
            this.store.dispatch(new AddUser(this.userForm.value)).subscribe(() => {
                this.clearForm();
            });
        }
    }

    clearForm() {
       this.userForm.reset();
        this.store.dispatch(new SetSelectedUser(null));
    }

    // resetForm() {
    //     console.log("Hello");
    //     this.store.dispatch(new SetSelectedUser(null));
    //     this.userForm.reset();
    // }
}
