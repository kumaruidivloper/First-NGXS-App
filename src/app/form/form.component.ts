import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UserState } from './../state/user.state';
import { AddUser, UpdateUser } from './../actions/user.action';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';
import { UserService } from './../user.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {
    @Select(UserState.getSelectedUser) selectedUser: Observable<User>;
    public userForm: FormGroup;
    public editUser = false;
    public isDisable: boolean = false;

    constructor(
        private fb: FormBuilder, 
        private store: Store, 
        private route: ActivatedRoute,
        private userService: UserService, 
        private router: Router) {
        this.createForm();
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id > 0) {
        this.isDisable = true;
        this.getUser(id);
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
    }

    getUser(id:number) {
        this.userService.selectedUsers(id).subscribe(selectedUser => {
            this.userForm.patchValue({
                // id: selectedUser.id,
                // userId: selectedUser.userId,
                // name: selectedUser.name
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
                this.router.navigate(['customer']);
            });
        } else if(this.userForm.value.userId != null){
            console.log(this.userForm.value.userId)
            this.store.dispatch(new AddUser(this.userForm.value)).subscribe(() => {
                this.clearForm();
                this.router.navigate(['customer']);
            });
        }
    }

    clearForm() {
        this.userForm.reset(); 
    }
}
