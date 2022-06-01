import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators'
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { AngularFireList } from "@angular/fire/database";



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
    userLogged = new BehaviorSubject<IUser>(null);
    userData: any;
    

    private tokenExpirationTimer: any;


    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private ngZone: NgZone,
        private userService: UserService
    ) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!)
            } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user')!);
            }
        })
    }

    signUp(email: string, password: string) {
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    login(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result.user.uid)
                this.ngZone.run(() => {
                    this.router.navigate([''])
                })
                this.SetUserData(result.user)
            })
            .catch(error => {
                window.alert(error.message)
            })
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            localId: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.id,
            userData.email,
            userData._token,
            new Date(userData._tokenExpirationDate),
            userData.localId)

        if (loadedUser.token) {
            this.user.next(loadedUser)

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }


    logout() {
        this.user.next(null);
        this.router.navigate(['/login'])
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

    private handleAuthenticaton(id: string, email: string, token: string, expiresIn: number, userId) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(id, email, token, expirationDate, userId);

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

    SetUserData(user: any) {
        this.userService.getUserById(user.uid)
        .snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        )
        .subscribe(data => {

            const user: IUser = {
                _id: data[0].key,
                name: data[0].name,
                email: data[0].email,
                profile: data[0].profile,
                phone: data[0].phone,
                createdAt: data[0].createdAt,
                updatedAt: data[0].updatedAt,
            }
            this.userLogged.next(user)
            
            
            console.log('userB')
            console.log(user)
        })
    }
}