import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EmergencyService} from "../../providers/services/emergency.service";
import {Emergency} from "../../providers/domain/emergency";
import {EmergencyInfo} from "../../providers/domain/emergency_info";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public emergencyService: EmergencyService) {

  }

  dummyEmergency() {
    if(this.emergencyService.emergency) {
      this.emergencyService.setEmergency(null);
    } else {
      let emergency: Emergency = new Emergency();
      emergency.activeEmergency = true;
      emergency.info = new EmergencyInfo();
      emergency.info.id = "1234";
      emergency.info.title = "University Closure";
      emergency.info.body = "The University is closed today (23 June 2017) from 11am due to forecast adverse weather.";
      this.emergencyService.setEmergency(emergency);
    }

  }

}
