import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContratsPage } from '../contrats/contrats';
import { DetailMissionPage } from "../detail-mission/detail-mission";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraImageProvider } from '../../providers/camera-image/camera-image';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';

/**
 * Generated class for the ReleveCompteursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class Compter {
  nummission= 0;
  eauFroide= false;
  eauFroidePhoto= '../assets/imgs/add_photo.svg';
  eauFroideNumero= '';
  eauFroideCompteur= '';
  eauFroideType= '';
  eauFroideReleve= '';
  eauFroideLocalisation= '';
  eauFroideObservation= '';
  eauChaude= false;
  eauChaudePhoto= '../assets/imgs/add_photo.svg';
  eauChaudeNumero= '';
  eauChaudeCompteur= '';
  eauChaudeType= '';
  eauChaudeReleve= '';
  eauChaudeLocalisation= '';
  eauChaudeObservation= '';
  chauffage= false;
  chauffagePhoto= '../assets/imgs/add_photo.svg';
  chauffageType= '';
  chauffageCha= '';
  chauffageObservation= '';
  electricite= false;
  electricitePhoto= '../assets/imgs/add_photo.svg';
  electricitePhoto2= '../assets/imgs/add_photo.svg';
  electriciteHeuresPleines= '';
  electriciteNumero= '';
  electriciteHeuresCreuse= '';
  electiriciteLocalisation= '';
  electiriciteObservation= '';
  gaz= false;
  gazPhoto= '../assets/imgs/add_photo.svg';
  gazCompteur= '';
  gazNumero= '';
  gazLocalisation= '';
  gazType= '';
  gazReleve= '';
  gazObservation= ''
}

@IonicPage()
@Component({
  selector: 'page-releve-compteurs',
  templateUrl: 'releve-compteurs.html',
})
export class ReleveCompteursPage {
  public camera: Camera;
  public numberPiece : number;
  cameraOptions: CameraOptions;

  eau_froide_image: string;
  chauffage_image: string;
  electricite_image: string;
  gaz_image: string;
 /*  compteur = {}; */

  compteur: any = {
    nummission: 0,
    eauFroide: false,
    eauFroidePhoto: '../assets/imgs/add_photo.svg',
    eauFroideNumero: '',
    eauFroideCompteur: '',
    eauFroideType: '',
    eauFroideReleve: '',
    eauFroideLocalisation: '',
    eauFroideObservation: '',
    eauChaude: false,
    eauChaudePhoto: '../assets/imgs/add_photo.svg',
    eauChaudeNumero: '',
    eauChaudeCompteur: '',
    eauChaudeType: '',
    eauChaudeReleve: '',
    eauChaudeLocalisation: '',
    eauChaudeObservation: '',
    chauffage: false,
    chauffagePhoto: '../assets/imgs/add_photo.svg',
    chauffageType: '',
    chauffageCha: '',
    chauffageObservation: '',
    electricite: false,
    electricitePhoto: '../assets/imgs/add_photo.svg',
    electricitePhoto2: '../assets/imgs/add_photo.svg',
    electriciteHeuresPleines: '',
    electriciteNumero: '',
    electriciteHeuresCreuse: '',
    electiriciteLocalisation: '',
    electiriciteObservation: '',
    gaz: false,
    gazPhoto: '../assets/imgs/add_photo.svg',
    gazCompteur: '',
    gazNumero: '',
    gazLocalisation: '',
    gazType: '',
    gazReleve: '',
    gazObservation: ''
  }

  compters: Compter[];
  isAdd = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraImageProvider: CameraImageProvider,
    public missionDataProvider: MissionDataProvider
  ) {
    this.camera = new Camera();
    this.cameraOptions = this.cameraImageProvider.options;
    this.numberPiece = this.navParams.get('numberPiece');

    this.compteur.nummission = this.navParams.get('nummission');
    this.compters = new Array<Compter>()
    this.compters.push(this.compteur);
    this.missionDataProvider.load(this.compteur.nummission, 'releveCompteurs').then((data:any) => {
      if (data.status != 'empty') {
       let nummission = this.compteur.nummission;
       this.compteur = data.data;
       this.compteur.nummission = nummission;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReleveCompteursPage');
  }

  add() {
    let newCompter = new Compter()
    newCompter.nummission = this.compteur.nummission
    this.compters.push(newCompter)
    this.isAdd = true;
  }

  remove() {
    if (Object.keys(this.compters).length >= 2) {
      this.compters.pop()
    }
    if (Object.keys(this.compters).length == 1)
      this.isAdd = false
  }

  prev() {
    //this.missionDataProvider.save(this.compteur.nummission, 'releveCompteurs', this.compteur, 'pending');
    this.missionDataProvider.saveMultipleCompteur('releveCompteurs', this.compters, 'pending');
    this.navCtrl.push(DetailMissionPage, { nummission: this.compteur.nummission, numberPiece : this.numberPiece }).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  next() {
    //this.missionDataProvider.save(this.compteur.nummission, 'releveCompteurs', this.compteur, 'pending');
    this.missionDataProvider.saveMultipleCompteur('releveCompteurs', this.compters, 'pending');

    this.navCtrl.push(ContratsPage, { nummission: this.compteur.nummission, numberPiece : this.numberPiece }).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  openCamera(target: number) {
    switch (target) {
      case 1:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.compteur.eauFroidePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 2:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.compteur.chauffagePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 3:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.compteur.electricitePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 4:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.compteur.gazPhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 5:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.compteur.eauChaudePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 6:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.compteur.electricitePhoto2 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      default:
        break;
    }
  }
  goToListPieces() {
    this.navCtrl.push(ListePiecesPage, {nummission: this.compteur.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
}
