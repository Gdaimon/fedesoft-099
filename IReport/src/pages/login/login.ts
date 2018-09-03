import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/Auth.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  Email: string;
  Password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public auth: AuthProvider ) {
  }

  login(){
    console.log(this.Email);
  }

  googleLogin() {
    this.auth.googleLogin();
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }

  twitterLogin() {
    this.auth.twitterLogin();
  }

  register(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
