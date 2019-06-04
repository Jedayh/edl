import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventairesClesPage } from '../inventaires-cles/inventaires-cles';
import { ReleveCompteursPage } from "../releve-compteurs/releve-compteurs";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraImageProvider } from '../../providers/camera-image/camera-image';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';


@IonicPage()
@Component({
  selector: 'page-contrats',
  templateUrl: 'contrats.html',
})
export class ContratsPage {
  public numberPiece: number;
  public camera: Camera;
  cameraOptions: CameraOptions;

  contrat = {
    'chaudiere': false,
    'chaudierePhoto': '../../assets/imgs/add_photo.svg',
    'chaudiereMarque': '',
    'chaudiereEntretienEffectue': false,
    'chaudiereEtat': '',
    'chaudiereObservation': '',
    'rapportEntretienPhoto': '../../assets/imgs/add_photo.svg',
    'cumulus': false,
    'cumulusPhoto': '../../assets/imgs/add_photo.svg',
    'cumulusMarque': '',
    'cumulusEtat': '',
    'cumulusFonctionnement': '',
    'cumulusObservation': '',
    'attestationPhoto': '../../assets/imgs/add_photo.svg',
    'attestationAssurance': '',
    'attestationDateAssurance': '',
    'attestationNumeroContrat': '',
    'detecteurFumee': false,
    'detecteurFumeeEtat': '',
    'detecteurFumeeControle': '',
    'detecteurFumeeFonctionnement': '',
    'detecteurFumeeLocalisation': '',
    'detecteurFumeeObservation': '',
    'detecteurFumeePhoto': '../../assets/imgs/add_photo.svg',
    'nummission': 0
  }

  // contrat: any = {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraImageProvider: CameraImageProvider,
    public missionDataProvider: MissionDataProvider
  ) {
    this.camera = new Camera();
    this.cameraOptions = this.cameraImageProvider.options;
    this.numberPiece = this.navParams.get('numberPiece');
    this.contrat.nummission = this.navParams.get('nummission');

    this.missionDataProvider.load(this.contrat.nummission, 'contrats').then((data:any) => {
      if (data.status != 'empty') {
       this.contrat = data.data;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContratsPage');
  }
  prev() {
    this.missionDataProvider.save(this.contrat.nummission, 'contrats', this.contrat, 'pending');
    this.navCtrl.push(ReleveCompteursPage, { nummission: this.contrat.nummission,numberPiece : this.numberPiece}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  next() {
    this.missionDataProvider.save(this.contrat.nummission, 'contrats', this.contrat, 'pending');
    this.navCtrl.push(InventairesClesPage, { nummission: this.contrat.nummission,numberPiece : this.numberPiece }).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  openCamera(target: number) {
    switch (target) {
      case 1:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.contrat.chaudierePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 2:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.contrat.rapportEntretienPhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 3:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.contrat.attestationPhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 4:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.contrat.detecteurFumeePhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 5:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.contrat.cumulusPhoto = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      default:
        break;
    }
  }

  updateFonctionnement()
  {
    if (this.contrat.detecteurFumeeControle == 'Non contrôlable') {
      this.contrat.detecteurFumeeFonctionnement = 'Non vérifiable';
    }
  }

  goToListPieces() {
    this.navCtrl.push(ListePiecesPage, {nummission: this.contrat.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
}
