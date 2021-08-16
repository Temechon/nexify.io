import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root'
})
// From https://www.positronx.io/full-angular-7-firebase-authentication-system/

export class AuthService {
    userData: any; // Save logged in user data
    uid: Observable<string>;

    constructor(
        public db: AngularFirestore,
        public auth: AngularFireAuth,
        public router: Router
    ) {
        this.uid = this.auth.authState.pipe(
            map((authState) => {
                if (!authState) {
                    return null;
                } else {
                    return authState.uid;
                }
            })
        );
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.auth.authState.subscribe(user => {
            console.log("authentication state updated", user);
            if (user) {
                console.log("retrieve user from local storage")
                // this.userData = user;
                this.userData = new User(JSON.parse(localStorage.getItem('nexify.user')));
                console.log(this.userData);

                // JSON.parse(localStorage.getItem('user'));
            } else {
                console.log("/!\\ remove user from local storage")
                localStorage.removeItem('nexify.user');
                // JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    // Sign up with email/password
    signUp(email: string, password: string, login: string) {
        let user: any;
        return this.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                user = result.user;
                console.log("Updating display name", user, "login", login)
                return result.user.updateProfile({
                    displayName: login
                })
            })
            .then(() => {
                console.log("You have been successfully registered!", user)
                this.setUserData(user, login);
            })
    }

    // Sign in with email/password ;,;
    signIn(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("authenticated !!", result)
                // Get user rights from database and save them in local storage
                this.setUserData(result.user)
            })
    }

    isLoggedIn(): Observable<boolean> {
        return this.uid.pipe(
            map(uid => {
                // console.log("USER", user)
                return !!uid;
            })
        );
    }

    /**
     * Retrieve this user from database and get all its rights
     */
    setUserData(user: any, login?: string) {
        const userRef = this.db.collection('users').doc(user.uid);

        const userData: any = {
            uid: user.uid,
            email: user.email,
            displayName: login || user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }

        userRef.set(userData, {
            merge: true
        }).then(() => {
            this.getUser(user.uid).pipe(first()).subscribe(data => {
                console.log("saving user in local storage", data)
                localStorage.setItem('nexify.user', JSON.stringify(new User(data)));
            })
        })



        /*.then(() => {
        console.log("ici 2")
        return this.db.collection('users').doc(user.uid).valueChanges().pipe(
            map((userdb: any) => {
                console.log("Saving user in database", userdb);
                localStorage.setItem('nexify.user', JSON.stringify(userdb));
            }))

        /*}).catch((e) => {
            console.error(e);
        })*/

    }

    getUser(uid: string) {
        return this.db.collection<any>('users').doc(uid).valueChanges();

    }

    // Sign out 
    signOut() {
        return this.auth.signOut().then(() => {
            // localStorage.removeItem('nexify.user');
        })
    }

}