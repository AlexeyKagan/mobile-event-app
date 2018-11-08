import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User, Credentials } from '../models/auth';
import { JwtService } from './jwt.service';


// @todo  global constants
// @todo Api service
const SERVER_HOST = 'http://localhost:8085';
const SERVER_API_PREFFIX = 'api'

const SERVER_API = `${SERVER_HOST}/${SERVER_API_PREFFIX}`;


@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtSerivce: JwtService
    ) {}

  private readonly API_LOGIN_URL = `${SERVER_API}/login`;
  private readonly API_SIGNUP_URL = `${SERVER_API}/signup`;

  onAuth(user: User) {
    this.jwtSerivce.saveToken(user.token);
  }

  login(cridentials: Credentials): Observable<User> {
    return this.http.post<User>(this.API_LOGIN_URL, cridentials)
      .pipe(
        tap((user) => this.onAuth(user))
      )
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(this.API_SIGNUP_URL, user)
      .pipe(
        tap((user) => this.onAuth(user))
      )
  }

  logout(): Observable<boolean> {
    this.jwtSerivce.destroyToken();
    return of(true);
  }
}