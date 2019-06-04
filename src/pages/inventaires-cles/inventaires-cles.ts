import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EquipementsExterieursPage } from '../equipements-exterieurs/equipements-exterieurs';
import { ContratsPage } from "../contrats/contrats";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraImageProvider } from '../../providers/camera-image/camera-image';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';

/**
 * Generated class for the InventairesClesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventaires-cles',
  templateUrl: 'inventaires-cles.html',
})
export class InventairesClesPage {
  public camera: Camera;
  public numberPiece : number;
  cameraOptions: CameraOptions;

  inventaire: any = {
    nummission: null,
    observation: '',
    image_inventaire_cle: "../assets/imgs/add_photo.svg",
    nbClesTotal: 0,
    list: [{ type: '', nombre: '', fonctionnement: '', obs: '' }]
  }
  /**
   * @todo Fiabiliser suppression
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraImageProvider: CameraImageProvider,
    public missionDataProvider: MissionDataProvider,
    private alertCtrl: AlertController
  ) {
    this.camera                = new Camera();
    this.cameraOptions         = this.cameraImageProvider.options;
    this.inventaire.nummission = this.navParams.get('nummission');
    this.numberPiece = this.navParams.get('numberPiece');

    this.missionDataProvider.load(this.inventaire.nummission, 'inventaireCles').then((data:any) => {
      if (data.status != 'empty') {
       let nummission = this.inventaire.nummission;
       this.inventaire = data.data;
       this.inventaire.nummission = nummission;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventairesClesPage');
  }

  updateValue(field, event, index)
  {
    if (field == 'type') {
      this.inventaire.list[index].type = event.target.value;
    } else if (field == 'obs') {
      this.inventaire.list[index].obs = event.target.value;
    } else if (field == 'fonctionnement') {
      this.inventaire.list[index].fonctionnement = event.target.value;
    } else {
      this.inventaire.list[index].nombre = event.target.value;
    }

    this.updateNbClesTotal();
  }

  updateNbClesTotal() {
    let nbKeys = 0;
    for (let i = 0; i < this.inventaire.list.length; i ++) {
      nbKeys += this.inventaire.list[i].nombre !== '' ? parseInt(this.inventaire.list[i].nombre) : 0;
    }
    this.inventaire.nbClesTotal = nbKeys;
  }

  prev() {
    this.missionDataProvider.save(this.inventaire.nummission, 'inventaireCles', this.inventaire, 'pending');
    this.navCtrl.push(ContratsPage, { nummission: this.inventaire.nummission,numberPiece : this.numberPiece }).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

  next() {
    let errorMsg = this.checkInventaireList();
    console.log(errorMsg);
    if (errorMsg != '') {
      this.alertCtrl.create({
        title: errorMsg,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          }
        ]
      }).present();
    } else {
      this.inventaire.list = [...this.inventaire.list];
      this.missionDataProvider.save(this.inventaire.nummission, 'inventaireCles', this.inventaire, 'pending');
      this.navCtrl.push(EquipementsExterieursPage, { nummission: this.inventaire.nummission, numberPiece : this.numberPiece }).then(() => {
        this.navCtrl.removeView(this.navCtrl.getPrevious());
      });
    }
  }

  checkInventaireList()
  {
    let prepareInventaireList = [];
    let errorMessage = '';

    this.inventaire.list.forEach((element) => {
      if (element.type != '') {
        if (element.nombre == '') {
          errorMessage = 'Le nombre de clés doit être renseigné pour toutes les lignes';
        }
        if (element.fonctionnement == '') {
          errorMessage = 'L\'état de fonctionnement doit être renseigné pour toutes les lignes';
        }
        if (element.fonctionnement == 'Autre' && element.obs == '') {
          errorMessage = 'L\'observation est obligatoire si vous choisissez la valeur "Autre"';
        }
        prepareInventaireList.push(element);
      }
    });
    if (errorMessage != '') {
      return errorMessage;
    }

    if (prepareInventaireList.length === 0) {
      return 'Vous devez renseigner au moins une ligne de l\'inventaire';
    }
    this.inventaire.list = prepareInventaireList;

    return '';
  }

  deleteKey(index) {
    let output = [];
    for (let i = 0; i < this.inventaire.list.length; i++) {
      if (index != i) {
        output.push(this.inventaire.list[i]);
      }
    }
    this.inventaire.list = output;
    this.inventaire.list = [...this.inventaire.list];

    this.updateNbClesTotal();
  }

  addKey() {
    this.inventaire.list.push({ type: '', nombre: '', fonctionnement: '', obs: '' });
    this.inventaire.list = [...this.inventaire.list];
  }

  openCamera() {
    this.camera.getPicture(this.cameraOptions)
      .then(imageData => {
        this.inventaire.image_inventaire_cle = 'data:image/jpeg;base64,' + imageData;
      })
      .catch((error) => {
        console.error(error);
      });

  }

  goToListPieces() {
    this.navCtrl.push(ListePiecesPage, {nummission: this.inventaire.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
}
