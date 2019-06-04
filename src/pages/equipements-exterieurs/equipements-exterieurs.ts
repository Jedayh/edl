import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SallePage } from '../salle/salle';
import { InventairesClesPage } from '../inventaires-cles/inventaires-cles';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraImageProvider } from '../../providers/camera-image/camera-image';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';

/**
 * Generated class for the EquipementsExterieursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipements-exterieurs',
  templateUrl: 'equipements-exterieurs.html',
})
export class EquipementsExterieursPage {

  public camera: Camera;
  cameraOptions: CameraOptions;
  public numberPiece : any;
  equipement = {
    nummission: null,
    passepose: false,
    passeposePhoto: '../assets/imgs/add_photo.svg',
    passeposeObservation: '',
    passeposeEtat: '',
    passeposeControle: '',
    passeposeFonctionnement: '',
    visiophone: false,
    visiophonePhoto: '../assets/imgs/add_photo.svg',
    visiophoneObservation: '',
    visiophoneEtat: '',
    visiophoneControle: '',
    visiophoneFonctionnement: '',
    interphone: false,
    interphonePhoto: '../assets/imgs/add_photo.svg',
    interphoneObservation: '',
    interphoneEtat: '',
    interphoneControle: '',
    interphoneFonctionnement: '',
    sonnette: false,
    sonnettePhoto: '../assets/imgs/add_photo.svg',
    sonnetteObservation: '',
    sonnetteEtat: '',
    sonnetteControle: '',
    sonnetteFonctionnement: '',
    boiteauxlettres: false,
    boiteauxlettresPhoto: '../assets/imgs/add_photo.svg',
    boiteauxlettresObservation: '',
    boiteauxlettresEtat: '',
    boiteauxlettresControle: '',
    boiteauxlettresFonctionnement: '',
    pieceIdentitePhoto1: '../assets/imgs/add_photo.svg',
    pieceIdentiteNumero1: '',
    pieceIdentitePhoto2: '../assets/imgs/add_photo.svg',
    pieceIdentiteNumero2: '',
    pieceIdentitePhoto3: '../assets/imgs/add_photo.svg',
    pieceIdentiteNumero3: '',
    pieceIdentitePhoto4: '../assets/imgs/add_photo.svg',
    pieceIdentiteNumero4: '',
    procurationPhoto: '../assets/imgs/add_photo.svg',
    procurationPhoto2: '../assets/imgs/add_photo.svg',
    procurationPhoto3: '../assets/imgs/add_photo.svg',
    procurationPhoto4: '../assets/imgs/add_photo.svg',
    procurationPhoto5: '../assets/imgs/add_photo.svg',
    procurationObservation: ''
  }

  /**
   * @todo Ajout de piece d'identité et de procuration
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraImageProvider: CameraImageProvider,
    public alertCtrl: AlertController,
    public missionDataProvider: MissionDataProvider
  ) {
    this.camera = new Camera();
    this.cameraOptions = this.cameraImageProvider.options;
    this.equipement.nummission = this.navParams.get('nummission');
    this.numberPiece = this.navParams.get('numberPiece');

    this.missionDataProvider.load(this.equipement.nummission, 'equipementsExterieurs').then((data:any) => {
      if (data.status != 'empty') {
       let nummission = this.equipement.nummission;
       this.equipement = data.data;
       this.equipement.nummission = nummission;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipementsExterieursPage');
  }

  prev() {
    this.missionDataProvider.save(this.equipement.nummission, 'equipementsExterieurs', this.equipement, 'pending');
    this.navCtrl.push(InventairesClesPage, { nummission: this.equipement.nummission,numberPiece : this.numberPiece }).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  next() {
    this.missionDataProvider.save(this.equipement.nummission, 'equipementsExterieurs', this.equipement, 'pending');
    this.navCtrl.push(SallePage, { nummission: this.equipement.nummission,numberPiece : this.numberPiece }).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  openCamera(id: number) {
    switch (id) {
      case 1:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.passeposePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 2:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.visiophonePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 3:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.interphonePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 4:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.sonnettePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 5:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.pieceIdentitePhoto1 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 6:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.pieceIdentitePhoto2 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 7:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.procurationPhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 8:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.pieceIdentitePhoto3 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 9:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.pieceIdentitePhoto4 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 10:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.procurationPhoto2 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 11:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.procurationPhoto3 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 12:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.procurationPhoto4 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 13:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.procurationPhoto5 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 14:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.equipement.boiteauxlettresPhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      default:
        break;
    }
  }
  updateFonctionnement(type)
  {
    if (this.equipement[type + 'Controle'] == 'Non contrôlable') {
      this.equipement[type + 'Fonctionnement'] = 'Non vérifiable';
    }
  }

  goToListPieces() {
    this.navCtrl.push(ListePiecesPage, {nummission: this.equipement.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
}
