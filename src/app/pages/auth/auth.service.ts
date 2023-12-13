
import { Iregister } from './models/iregister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ilogin } from './models/ilogin';
import { BehaviorSubject, Subject, Observable, tap, catchError, throwError, map } from 'rxjs';
import { IAccessData } from './models/i-access-data';
import { IUser } from './models/i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService()

  authSubject = new BehaviorSubject<any | null>(null)
  errorSubject = new Subject<boolean>()
  wrongPasswordSubject = new Subject<boolean>()
  notExistingUserSubject = new Subject<boolean>()
  loadingSubject = new Subject<boolean>()

  user$ = this.authSubject.asObservable()
  error$ = this.errorSubject.asObservable()
  isLogged$ = this.user$.pipe(map(user => !!user));
  loading$ = this.loadingSubject.asObservable()
  wrongPassword$ = this.wrongPasswordSubject.asObservable()
  notExistingUser$ = this.notExistingUserSubject.asObservable()

  apiUrl: string = 'http://localhost:3000'
  loginUrl: string = this.apiUrl + '/login'
  registerUrl: string = this.apiUrl + '/register'
  userUrl: string = 'http://localhost:3000/users'

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser()
  }

  login(obj: Ilogin): Observable<IAccessData> {
    return this.http.post<IAccessData>(this.loginUrl, obj)
    .pipe(tap(data => {
      this.authSubject.next(data)
      localStorage.setItem('accessData', JSON.stringify(data))
      this.autoLogout(data.accessToken)
    }),
    catchError(error => {
      this.stopLoading()
      switch (error.error) {
        case ("Incorrect password"):
          this.wrongPasswordSubject.next(true);
          return throwError(() => new Error);
        case ("Password is too short"):
          this.wrongPasswordSubject.next(true);
          return throwError(() => new Error);
        case ("Cannot find user"):
          this.notExistingUserSubject.next(true);
          return throwError(() => new Error);
        default:
          this.errorSubject.next(true);
          setTimeout(() => {
            this.errorSubject.next(false);
          }, 4000);
      }
      return throwError(() => new Error())
    }))
  }

  register(obj: Iregister): Observable<any> {
    return this.http.post(this.registerUrl, obj)
    .pipe(catchError(error => {
      this.loadingSubject.next(false);
      this.errorSubject.next(true);
      setTimeout(() => {
        this.errorSubject.next(false);
      }, 4000);
      return throwError(() => new Error())
    }))
  }

  logout() {
    this.authSubject.next(null)
    localStorage.removeItem('accessData')
    this.router.navigate(['/'])
  }

  autoLogout(jwt: string) {
    const expDate: Date = this.jwtHelper.getTokenExpirationDate(jwt) as Date
    const expMs: number = expDate.getTime() - new Date().getTime()
    setTimeout(() => {
      this.logout()
    }, expMs)
  }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData')
    if(!userJson) return
    const accessData: any = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return
    this.autoLogout(accessData.accessToken)
    this.authSubject.next(accessData)
  }

  startLoading() {
    this.loadingSubject.next(true)
  }

  stopLoading() {
    this.loadingSubject.next(false)
  }

  getUserById(id:number):Observable<IUser>{
    return this.http.get<IUser>(`${this.userUrl}/${id}`)
  }

  updateUserInfo(obj: IUser): Observable<IUser> {
    console.log(obj);
    return this.http.put<IUser>(`${this.userUrl}/${obj.id}`, obj);
  }

}
