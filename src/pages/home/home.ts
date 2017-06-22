import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EmergencyMessage} from "../../model/emergency_message";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  emergency: EmergencyMessage;

  constructor(public navCtrl: NavController) {

  }

  dummyEmergency() {
    if(this.emergency) {
      this.emergency = null;
    } else {
      this.emergency = new EmergencyMessage();
      this.emergency.id = 1234;
      this.emergency.level = 1;
      this.emergency.title = "University Closure";
      this.emergency.message = "The University is closed today (23 June 2017) from 11am due to forecast adverse weather. For more information go to www.auckland.ac.nz";
    }

  }

}
