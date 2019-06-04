import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Technicien } from '../../models/technicien.model';

@Injectable()
export class UserProvider {
  technicienConnected: Technicien;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  setTechnicienConnected(technicien: Technicien) {
    this.technicienConnected = technicien;
  }
  getTechnicienConnected(): Technicien {
    return this.technicienConnected;
  }
  resetTechnicienData() {
    this.technicienConnected = new Technicien();
  }
}
