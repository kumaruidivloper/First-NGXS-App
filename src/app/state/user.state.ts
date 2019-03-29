import {State, Action, StateContext, Selector} from '@ngxs/store';
import { User } from './../models/user.model';
import {AddUser, DeleteUser, GetUsers, SetSelectedUser, UpdateUser} from '../actions/user.action'
import {UserService} from '../user.service';
import {tap} from 'rxjs/operators';

export class UserStateModel {
    users: User[];
    selectedUser: User;
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        selectedUser: null
    }
})
export class UserState {

    constructor(private userService: UserService) {
    }

    @Selector()
    static getUserList(state: UserStateModel) {
        return state.users;
    }

    @Selector()
    static getSelectedUser(state: UserStateModel) {
        return state.selectedUser;
    }

    @Action(GetUsers)
    getTodos({getState, setState}: StateContext<UserStateModel>) {
        return this.userService.fetchUsers().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                users: result,
            });
        }));
    }

    @Action(AddUser)
    addTodo({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
        return this.userService.addUser(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                users: [...state.users, result]
            });
        }));
    }

    @Action(UpdateUser)
    updateTodo({getState, setState}: StateContext<UserStateModel>, {payload, id}: UpdateUser) {
        return this.userService.updateUser(payload, id).pipe(tap((result) => {
            const state = getState();
            const userList = [...state.users];
            const userIndex = userList.findIndex(item => item.id === id);
            userList[userIndex] = result;
            setState({
                ...state,
                users: userList,
            });
        }));
    }


    @Action(DeleteUser)
    deleteTodo({getState, setState}: StateContext<UserStateModel>, {id}: DeleteUser) {
        return this.userService.deleteUser(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.users.filter(item => item.id !== id);
            setState({
                ...state,
                users: filteredArray,
            });
        }));
    }

    @Action(SetSelectedUser)
    setSelectedTodoId({getState, setState}: StateContext<UserStateModel>, {payload}: SetSelectedUser) {
        const state = getState();
        setState({
            ...state,
            selectedUser: payload
        });
    }
}