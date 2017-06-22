import {Injectable} from "@angular/core";
import {Emergency} from "../domain/emergency";

@Injectable()
export class EmergencyService {
  emergency: Emergency

  public setEmergency(em: Emergency) {
    this.emergency = em;
  }
}
