import { HttpErrorResponse } from "@angular/common/http"
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, BehaviorSubject } from "rxjs";

import { User } from "src/app/models/user.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from "@angular/fire/database";



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private ngZone: NgZone,
        private db: AngularFireDatabase
    ) { }

    async getCurrentUser() {
        return await this.afAuth.currentUser;
    }

    login(email: string, password: string) {
        return this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.handleAuthenticaton(result.user);
                this.ngZone.run(() => {
                    this.router.navigate(['/']);
                });
            })
            .catch((error) => {
                this.router.navigate(['/login']);
            });
    }


    signUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }



    autoLogin() {
        this.afAuth.onAuthStateChanged((user) => {
            if (user != null) {
                this.afAuth.updateCurrentUser(user)
            } else {
                console.log("user lost")
            }
        })

        const userData: {
            email: string;
            id: string;
            userId: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.id,
            userData.email,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )

        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }


    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['/login'])
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    private handleAuthenticaton(userAuth: any) {
        const expiresIn = 3600;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

        const user = new User(userAuth.uid, userAuth.email, userAuth.refreshToken, expirationDate);

        this.user.next(user);
        this.afAuth.updateCurrentUser(userAuth);
        localStorage.setItem('userAuth', JSON.stringify(userAuth))
        localStorage.setItem('userData', JSON.stringify(user))

        this.autoLogout(expiresIn * 1000);
    }

    forgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Email de redefinição de senha enviado, verifique sua caixa de entrada');
            })
            .catch((error) => {
                window.alert(error);
            });
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