import { Component } from '@angular/core';
import {Events, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {Firebase} from "@ionic-native/firebase";
import {EmergencyService} from "../providers/services/emergency.service";
import {EmergencyInfo} from "../providers/domain/emergency_info";
import {Emergency} from "../providers/domain/emergency";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public firebase: Firebase,
              public emergencyService: EmergencyService, public events: Events) {

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

      this.firebase.onNotificationOpen().subscribe(
        data => {
          let emergency: Emergency = new Emergency();
          emergency.activeEmergency = true;
          emergency.info = new EmergencyInfo();
          emergency.info.id = "1234";
          emergency.info.title = data.title;
          emergency.info.body = data.text;
          this.emergencyService.setEmergency(emergency);
          this.events.publish('data:valueChanged');
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}
