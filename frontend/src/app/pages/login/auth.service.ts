import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators'


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
    API_key = "AIzaSyBBleMGlwxTJgj9TKSUYmcjrUCcZYDu4jc";

    register_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_key;

    login_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_key;

    constructor(private http: HttpClient) { }

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
        }).pipe(catchError(this.handlerError))
    }

    private handlerError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error ocurred!'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exist already';
            break;
            case 'EMAIL_NOT_FOUND':
                errorMessage ='This email not found'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct'
        }
        return throwError(errorMessage);
    }
}