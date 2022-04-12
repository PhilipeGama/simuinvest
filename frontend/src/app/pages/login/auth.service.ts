import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from 'rxjs/operators'
import { User } from "./user.model";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any; 

    API_key = "AIzaSyBBleMGlwxTJgj9TKSUYmcjrUCcZYDu4jc";

    register_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_key;

    login_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_key;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.register_URL, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe
            (catchError(errorRes => {
                let errorMessage = 'An unknown error ocurred!'
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exist already'
                }
                return throwError(errorMessage);
            })
            );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.login_URL, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handlerError), tap(resData => {
            localStorage.setItem('userData', JSON.stringify(resData));
            this.handleAuthenticaton(resData.idToken, resData.email, resData.idToken, +resData.expiresIn)
        }))
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.id, 
            userData.email, 
            userData._token,
            new Date(userData._tokenExpirationDate))
        
        if(loadedUser.token){
            this.user.next(loadedUser)

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }

    
    logout(){
        this.user.next(null);
        this.router.navigate(['/login'])
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        } 
        this.tokenExpirationTimer = null;
        this.router.navigate(['/login'])
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    private handleAuthenticaton(id: string, email: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(id, email, token, expirationDate);

        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handlerError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error ocurred!'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exist already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email not found'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct'
        }
        return throwError(errorMessage);
    }
}