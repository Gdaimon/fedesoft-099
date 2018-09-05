import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { ReportFormPage } from '../pages/report-form/report-form';
import { WallPage } from '../pages/wall/wall';
import { AuthProvider } from '../providers/auth/Auth.service';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    LoginPage,
    MapPage,
    ReportFormPage,
    WallPage
  ],
  imports: [
    BrowserModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    LoginPage,
    MapPage,
    ReportFormPage,
    WallPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
