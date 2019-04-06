import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers() {
      return this.http.get<User[]>('http://localhost:3000/sampleProducts');
  }

  selectedUsers(id: number) {
    return this.http.get<User[]>(`http://localhost:3000/sampleProducts/${id}`);
}

  deleteUser(id: number) {
      return this.http.delete(`http://localhost:3000/sampleProducts/${id}`);
  }

  addUser(payload: User) {
      return this.http.post<User>('http://localhost:3000/sampleProducts', payload);
  }

  updateUser(payload: User, id: number) {
      return this.http.put<User>(`http://localhost:3000/sampleProducts/${id}`, payload);
  }
}
