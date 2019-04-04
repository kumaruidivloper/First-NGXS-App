import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import { UserState } from './../state/user.state';
import {AddUser, SetSelectedUser, UpdateUser} from './../actions/user.action';
import {Observable} from 'rxjs';
import {User} from './../models/user.model';
import { UserService } from './../user.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
    @Select(UserState.getSelectedUser) selectedUser: Observable<User>;
    userForm: FormGroup;
    editUser = false;
    @Input() event: Event;
    @Input() event1: Event;
    public clickedEvent: Event;

    constructor(
        private fb: FormBuilder, 
        private store: Store, 
        private route: ActivatedRoute,
        private userService: UserService, 
        private router: Router) {
        this.createForm();
    }

    ngOnChanges() {
        if (event) {
            this.userForm.reset();
            this.editUser = false;
        }
    }

    ngOnInit() {
        if (this.event1) {
        const id = +this.route.snapshot.paramMap.get('id');
        this.getUser(id);
        }
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

    getUser(id:number) {
        this.userService.selectedUsers(id).subscribe(selectedUser => {
            this.userForm.patchValue({
                id: selectedUser.id,
                userId: selectedUser.userId,
                name: selectedUser.name
            })
        })
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
                this.router.navigate(['/users']);
            });
        } else if(this.userForm.value.userId != null){
            this.store.dispatch(new AddUser(this.userForm.value)).subscribe(() => {
                this.clearForm();
                this.router.navigate(['/users']);
            });
        }
    }

    clearForm() {
       this.userForm.reset();
        this.store.dispatch(new SetSelectedUser(null));
    }
}
