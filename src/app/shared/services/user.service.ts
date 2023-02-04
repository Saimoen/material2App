import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

interface ApiResponse {
  results: any[];
  info: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http
      .get<ApiResponse>('https://randomuser.me/api/?results=10')
      .pipe(
        map((res: ApiResponse) => {
          const users = res.results.map((user) => ({
            gender: user.gender,
            cell: user.cell,
            email: user.email,
            nat: user.nat,
            phone: user.phone,
          }));
          return users;
        })
      );
  }
}
