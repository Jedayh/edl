import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PrendrePhotoPage } from '../prendre-photo/prendre-photo';
import { EquipementsExterieursPage } from "../equipements-exterieurs/equipements-exterieurs";
import { Salle } from '../../models/salle.model';
import { EdlProvider } from '../../providers/edl/edl';
import { SignaturePage } from "../../pages/signature/signature";
import { SalleDataProvider } from '../../providers/salle-data/salle-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';

@Component({
  selector: 'page-salle',
  templateUrl: 'salle.html',
})
export class SallePage {
  salles: Salle[];
  selectSql: any[];
  nummission: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public edlProvider: EdlProvider,
    public salleDataProvider: SalleDataProvider
  ) {
    this.salles = edlProvider.getSalles();
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SallePage');
    this.nummission = this.navParams.get('nummission');
    let currentIndex = this.navCtrl.getActive().index;
    this.salleDataProvider.setIndexSallePage(currentIndex);
  }
  
  goToPrendrePhoto(salle: Salle) {
    this.salleDataProvider.setSalleData(salle);
    this.navCtrl.push(PrendrePhotoPage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  goToFormetat() {
    this.navCtrl.push(EquipementsExterieursPage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  goToResumeEdl() {
    this.navCtrl.push(SignaturePage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  goToListPieces() {
    this.navCtrl.push(ListePiecesPage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
}
