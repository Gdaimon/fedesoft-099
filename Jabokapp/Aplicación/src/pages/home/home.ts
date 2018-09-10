import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myForm: FormGroup;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder) {
      this.myForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  loginUser(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
  }

  ingresar(){
    this.navCtrl.push('IngresoPage');
  }

  conocerHumedal(){
    this.navCtrl.push('AcercaDelHumedalPage');
  }

}
