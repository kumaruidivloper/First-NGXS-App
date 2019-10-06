import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { UserState } from '../+state/user.state';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';
import { UserService } from '../../../user.service';

@Component ({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public userSelected: object;
  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;

  constructor(private store: Store, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getUser(id);
    this.selectedUser.subscribe(user => {
      this.userSelected = user;
    });
  }

  getUser(id: number) {
    this.userService.selectedUsers(id).subscribe(selectedUser => {
      this.userSelected = selectedUser;
    });
  }
}
