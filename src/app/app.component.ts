import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {Firebase} from "@ionic-native/firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public firebase: Firebase) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.configureFirebase();
    });
  }

  public configureFirebase() {
    try {
      this.firebase.getToken()
        .then(token => {})
        .catch(err => console.log("Error on FirebasePlugin.getToken: " + err));
      this.firebase.onTokenRefresh()
        .subscribe(token => {});

      this.firebase.subscribe("emns").then(response => {});
    } catch (e) {
      console.log(e);
    }
  }
}
