
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';


import { ToastController } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private authState: any = null;

  constructor(private toastCtrl: ToastController,
              private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase ){

              this.firebaseAuth.authState.subscribe((auth) => {
                this.authState = auth;
              });
  }

  private isLoggedIn() {
    return this.firebaseAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(auth => !auth ? false : true);
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }
  get currentUserEmail(): string {
    return this.authenticated ? this.authState.email : '';
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user;
          console.log(this.authState);
          this.updateUserData();
      })
      .catch(error => {
        console.log(error);
        let toast = this.toastCtrl.create({
          message: 'Authentication failed '  + error,
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }

  emailSignUp(email: string, password: string, name: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        console.log(user);
        this.updateUserData(name);
      })
      .catch(error => {
        let toast = this.toastCtrl.create({
        message: 'Authentication failed',
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  }

  emailLogin(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        //this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        let toast = this.toastCtrl.create({
        message: 'Authentication failed',
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  }

  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  anonymousLogin() {
    return this.firebaseAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user;
      this.updateUserData();
    })
    .catch(error => console.log(error));
  }

  private updateUserData(name?: string): void {
    console.log(name);
    const path = `users/${this.currentUserId}`;
    const data = {
      name: this.authState.displayName != null ? this.authState.displayName : name,
      email: this.authState.email
    };
    // Save in database
    this.db.object(path).update(data).then(() => '',
    ).catch( error => 'Authentication failed' );
  }
  
  signOut(): void {
    this.firebaseAuth.auth.signOut();
    //this.router.navigate(['/']);
  }


}
