import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Salle } from '../../models/salle.model';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { SallePage } from '../salle/salle';
import { SelectionDefautPage } from '../selection-defaut/selection-defaut';
import { SalleDataProvider } from '../../providers/salle-data/salle-data';
import { PanoDataProvider } from '../../providers/pano-data/pano-data';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';

@Component({
  selector: 'page-prendre-photo',
  templateUrl: 'prendre-photo.html',
})
export class PrendrePhotoPage {
  salle: Salle;
  nomPiece: string;
  imgPanoramique: any;
  // THETA TICOH VARS
  sessionId = '';
  currentPicture = '';
  currentThetaState;
  nummission: any;
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public salleDataProvider: SalleDataProvider,
    public panoDataProvider: PanoDataProvider,
    private http: HTTP,
    private file: File,
    public missionDataProvider: MissionDataProvider
  ) {
    this.salle = salleDataProvider.getSalleData();
    this.nummission = this.navParams.get("nummission");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PrendrePhotoPage');
  }
  goToSalle() {
    this.navCtrl.push(SallePage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
  showAlert(title: string, msg: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();
  }
  checkPieceNom() {
    this.missionDataProvider.load(this.nummission, 'salle-' + this.salle.name + this.nomPiece)
    .then((data:any) => {
      if (data.status != 'empty') {
        let alert = this.alertCtrl.create({
          title: 'La pièce "' + this.nomPiece + '" existe déjà',
          subTitle: 'Que souhaitez-vous faire ?',
          buttons: [
            {
              text: 'Renseigner une nouvelle pièce',
              role: 'cancel',
              handler: () => {
                this.nomPiece = '';
              }
            },
            {
              text: 'Modifier la pièce existante',
              handler: () => {
                this.salleDataProvider.setNomPiece(this.nomPiece);
                this.navCtrl.push(SelectionDefautPage, {nummission: this.nummission}).then(() => {
                  this.navCtrl.removeView(this.navCtrl.getPrevious());
                });
              }
            },
            {
              text: 'Remplacer la pièce existante',
              role: 'cancel',
              handler: () => {
                console.log('Cancel btn pressed!');
              }
            }
          ]
        });
        alert.present();
      }
    });
  }
  prendrePhoto() {
    if (this.nomPiece) {
      let self = this;
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        targetHeight: 3072,
        targetWidth: 3072
      }
      this.camera.getPicture(options).then((imageData) => {
        self.imgPanoramique = 'data:image/jpeg;base64,' + imageData
        this.loading = this.loadingCtrl.create({
          content: 'La prise de vue 360° est en cours de traitement.'
        });
        this.loading.present().then(_ => {
          this.panoDataProvider.setImagePano(this.imgPanoramique);
          this.salleDataProvider.setNomPiece(this.nomPiece);
          this.navCtrl.push(SelectionDefautPage, {nummission: this.nummission}).then(() => {
            this.navCtrl.removeView(this.navCtrl.getPrevious());
          });
          this.loading.dismiss();
        });
      }, (err) => {
        console.log('Nisy erreur: ', err);
      });
    } else {
      this.showAlert('Nom de la pièce', 'Vous devez indiquer le nom de la pièce');
    }
  }
  prendrePhotoDepuisTablette()
  {
    if (this.nomPiece) {
      let self = this;
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: false,
        targetHeight: 3072,
        targetWidth: 3072,
        correctOrientation: true
      }
      this.camera.getPicture(options).then((imageData) => {
        self.imgPanoramique = 'data:image/jpeg;base64,' + imageData
        this.loading = this.loadingCtrl.create({
          content: 'La prise de vue 360° est en cours de traitement.'
        });
        this.loading.present().then(_ => {
          this.panoDataProvider.setImagePano(this.imgPanoramique);
          this.salleDataProvider.setNomPiece(this.nomPiece);
          this.navCtrl.push(SelectionDefautPage, {nummission: this.nummission}).then(() => {
            this.navCtrl.removeView(this.navCtrl.getPrevious());
          });
          this.loading.dismiss();
        });
      }, (err) => {
        console.log('Nisy erreur: ', err);
      });
    } else {
      this.showAlert('Nom de la pièce', 'Vous devez indiquer le nom de la pièce');
    }
  }
  // FONCTIONS POUR LA PRISE DE VUE 360 DEPUIS LA CAMERA THETA RICOH
  newPicture() {
    if (this.nomPiece) {
      this.missionDataProvider.lsGetItem('isOnline').then(connected => {
        if (connected) {
          this.showAlert('Connexion à la caméra Theta', 'Pour prendre une photo 360°, vous devez être connecté au réseau WIFI de la caméra Ricoh Theta');

          return false;
        } else {
          this.getState().then(() => {
            if (typeof this.currentThetaState == 'undefined') {
              this.showAlert('Connexion à la caméra Theta', 'Pour prendre une photo 360°, vous devez être connecté au réseau WIFI de la caméra Ricoh Theta');

              return false;
            }
            this.loading = this.loadingCtrl.create({
              content: 'Connexion à la caméra Theta en cours'
            });

            this.loading.present();
            this.currentPicture = this.currentThetaState.fingerprint;
            if (this.currentThetaState.state._apiVersion == 1
              || this.currentThetaState.state.sessionId == "SID_0000"
            ) {
              this.initSessionId();
            } else {
              // On initialise la taille et on prend la photo
              this.takePicture();
            }
          });
        }
      });
    } else {
      this.showAlert('Nom de la pièce', 'Vous devez indiquer le nom de la pièce');
    }
  }

  updatePreview() {
    this.loading.data.content = 'Préparation de la prise de vue 360° sur la caméra Theta';
    let self = this;
    this.getState().then(() => {
      if (this.currentThetaState.state._latestFileUrl !== '' && this.currentThetaState.fingerprint !== this.currentPicture) {
        this.loading.data.content = 'Transmission de la prise de vue 360° vers l\'application';
        this.http.downloadFile(this.currentThetaState.state._latestFileUrl, {}, {}, this.file.dataDirectory + "test.jpg")
        .then(data => {
          data.file((File) => {
            console.log('filereader');
            this.loading.data.content = 'Traitement de la prise de vue 360°';
            let reader = new FileReader();
            reader.onloadend = () => {
                this.loading.data.content = 'Redimensionnement de la prise de vue 360°';
                console.log('onloadend');
                let image = new Image();
                let promise = new Promise((resolve, reject) => {
                  image.onload = function(){
                    console.log('onload');
                    let canvas    = document.createElement("canvas");
                    let context   = canvas.getContext("2d");

                    canvas.width  = 3072;
                    canvas.height = Math.round(image.height * (image.width / 3072));
                    context.drawImage(image,
                        0,
                        0,
                        image.width,
                        image.height,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                    resolve(canvas.toDataURL());
                  }
                  image.src = reader.result;
                });
                promise.then((dataUrl) => {
                  this.loading.data.content = 'La prise de vue 360° est prête';
                  self.imgPanoramique = dataUrl;
                  self.currentPicture = self.currentThetaState.fingerprint;
                  self.panoDataProvider.setImagePano(self.imgPanoramique);
                  self.salleDataProvider.setNomPiece(self.nomPiece);
                  self.navCtrl.push(SelectionDefautPage, {nummission: self.nummission}).then(() => {
                    this.navCtrl.removeView(this.navCtrl.getPrevious());
                  });
                  self.loading.dismiss();
                });
            };
            reader.readAsDataURL(File);
          });
        })
        .catch(error => {
          console.log('error : ');
          console.log(error);
          this.loading.dismiss();
        });

        return true;
      }
      setTimeout(() => {
        this.updatePreview()
      }, 1000);
    });
  }

  getState() {
    return new Promise((resolve, reject) => {
      this.currentThetaState = null;
      this.executeService('/osc/state', {}, (data) => {
        this.currentThetaState = data;

        return resolve(data);
      });
    });
  }

  takePicture() {
    this.loading.data.content = 'Demande de prise de vue 360° envoyée à la caméra Theta';
    this.executeService('/osc/commands/execute', {
      "sessionId": this.sessionId,
      'name': 'camera.takePicture',
      'parameters': {}
    }, (data) => {
      console.log('theta takePicture');
      this.updatePreview();
    });
  }
  initApiVersion() {
    this.executeService('/osc/commands/execute', {
      "name": "camera.setOptions",
      "parameters": {
        "sessionId": this.sessionId,
        "options": {
          "clientVersion": 2
        }
      }
    }, (data) => {
      console.log('theta initApiVersion');
      this.takePicture();
    });
  }
  initSessionId() {
    this.executeService('/osc/commands/execute', {
      'name': 'camera.startSession',
      'parameters': {}
    }, (data) => {
      if (data.state != 'error') {
        this.sessionId = data.results.sessionId;
        console.log('theta sessionId : ' + this.sessionId);
      }
      this.initApiVersion();
    });
  }
  executeService(requestUri, data, callback) {
    this.http.setDataSerializer('json');
    console.log('executeService : http://192.168.1.1:80' + requestUri);
    console.log(data);

    return this.http.post("http://192.168.1.1:80" + requestUri, data, {'Content-Type': 'application/json'})
    .then(data => {
      console.log(JSON.parse(data.data));

      return callback(JSON.parse(data.data));
    })
    .catch(error => {
      console.log('error : ');
      console.log(error);
      this.showAlert('Connexion à la caméra Theta', 'Pour prendre une photo 360°, vous devez être connecté au réseau WIFI de la caméra Ricoh Theta');
      this.loading.dismiss();
    });
  }

  goToListPieces() {
    this.navCtrl.push(ListePiecesPage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
}
