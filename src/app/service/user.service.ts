import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../api/user';
import { Constant } from '../config/constant';

@Injectable()
export class UserService {

    public users: User[] = [];
    constant = Constant;

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<any>(this.constant.baseURL+'users')
            .toPromise()
            .then(res => res as User[])
    }

    addUsers(payload:any) {
        return this.http.post<any>(this.constant.baseURL+'users',payload)
            .toPromise()
            .then(res => res as User[])
    }

    updateUser(payload:any) {
        return this.http.put<any>(this.constant.baseURL+'users/1',payload)
            .toPromise()
            .then(res => res as User[])
    }

    deleteUsers(payload:any) {
        return this.http.delete<any>(this.constant.baseURL+'users/delete',payload)
            .toPromise()
            .then((res) => {})
    }

    deleteUser(payload:any) {
        return this.http.delete<any>(this.constant.baseURL+'users/'+payload.id)
            .toPromise()
            .then((res) => {})
    }

}
