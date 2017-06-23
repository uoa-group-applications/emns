import {Component, NgZone} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {EmergencyService} from "../../providers/services/emergency.service";
import {Emergency} from "../../providers/domain/emergency";
import {EmergencyInfo} from "../../providers/domain/emergency_info";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  emergency: Emergency;

  constructor(public navCtrl: NavController, public emergencyService: EmergencyService, events: Events, ngZone: NgZone) {
    this.emergency = this.emergencyService.emergency;
    events.subscribe('data:valueChanged', () => {
      ngZone.run(() => {
        this.emergency = this.emergencyService.emergency;
      });

    });
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
    this.emergency = this.emergencyService.emergency;
  }

}
