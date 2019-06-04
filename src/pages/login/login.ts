import { Component } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import axios from 'axios';
import { Technicien } from '../../models/technicien.model';
import { UserProvider } from '../../providers/user/user';
import * as Promise from 'bluebird';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';

const VENTE_CMCIC_URL = "https://abcimmoservi.sogexpert.com/synchro_logiciel?action=";
const LOCATION_NATIONALE_URL = "https://location.sogexpert.com/synchro_logiciel?action=";
const GESTION_LOCATION_CMCIC_URL = "https://abcimmodiag.sogexpert.com/synchro_logiciel?action=";
const MEDIALIBS_URL = "https://medialibs.sogexpert.com/synchro_logiciel?action=";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private token = "AOBPHCANOFNO56169";
  private login = ""; // abcvannes
  private password = ""; // abcvannes7452
  private action = "get_connexion";
  technicienConnected: Technicien;
  isOnline: boolean;
  connectionCount = 0;
  successConnectionCount = 0;
  failureConnectionCount = 0;
  connectionFailedList: string[] = [];
  succeededPlateforms = [];
  failedPlateforms = [];
  loading;
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public http: HttpClient,
    private toastCtrl: ToastController,
    public userProvider: UserProvider,
    public alertCtrl: AlertController,
    public missionDataProvider: MissionDataProvider,
    private loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.missionDataProvider.lsGetItem('isOnline').then(connected => {
          this.missionDataProvider.lsGetItem('technicienConnected').then(data => {
            if (data) {
              if (!connected) { // redirection to homepage
                this.navCtrl.push(HomePage);
              } else {
                this.missionDataProvider.lsGetItem('session')
                  .then((session:any) => {
                    console.log(session);
                    this.login = session.login;
                    this.password = session.password;
                    this.connectUser();
                  })
              }
            } else {
              this.presentToast('Aucune donnée disponible', 3000, 'bottom');
            }
          });
        });
      }, 1000);
    });
  }

  presentToast(message: string, duration: number, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  connectUser() {
    this.loading = this.loadingCtrl.create({
      content: 'Authentification'
    });
    this.loading.present();
    this.succeededPlateforms = [];
    this.failedPlateforms = []
    this.missionDataProvider.lsSetItem('succeededPlateforms', this.succeededPlateforms)
      .then(() => {
        return Promise.all([
          this.connectToVenteCMCIC(),
          this.connectToLocationNationale(),
          this.connectToGestionLocationCMCIC(),
          this.connectToMedialibs()
        ])
      }).then((results) => {
        return Promise.each(results, (result) => {
          if (result.ok) {
            this.succeededPlateforms.push({
              plateformeCode: result.plateformeCode,
              technicien: result.technicien
            });
          } else {
            if (result.plateformeName != 'Pré-production') {
              this.failedPlateforms.push(result.plateformeName);
            }
          }
        })
      })
      .then(() => {
        if (this.succeededPlateforms.length > 0) {
          if (this.failedPlateforms.length > 0) {
            this.presentToast('L\'authentification sur les plateformes suivantes ne fonctionne pas : ' + this.failedPlateforms.join(', '), 3000, 'bottom');
          }
          this.missionDataProvider.lsSetItem('succeededPlateforms', this.succeededPlateforms).then(() => {
            this.missionDataProvider.lsSetItem('technicienConnected', this.technicienConnected).then(() => {
              this.missionDataProvider.lsSetItem('session', {login: this.login, password: this.password}).then(() => {
                this.loading.dismiss();
                this.navCtrl.push(HomePage);
              });
            });
          });
        } else {
          this.loading.dismiss();
          this.showAlert('Authentification impossible', 'Vérifiez vos identifiants de connexion et votre connexion internet.');
        }
      })
  }
  connectToVenteCMCIC() {
    return this.sendConnectionRequestTo(VENTE_CMCIC_URL + this.action + "&token=" + this.token + "&login=" + this.login + "&password=" + this.password,
                                        'Vente CMCIC',
                                        '6SYFF');
  }
  connectToLocationNationale() {
    return this.sendConnectionRequestTo(LOCATION_NATIONALE_URL + this.action + "&token=" + this.token + "&login=" + this.login + "&password=" + this.password,
                                        'Location nationale',
                                        '3CF81');
  }
  connectToGestionLocationCMCIC() {
    return this.sendConnectionRequestTo(GESTION_LOCATION_CMCIC_URL + this.action + "&token=" + this.token + "&login=" + this.login + "&password=" + this.password,
                                        'Location CMCIC',
                                        'CMCIC');
  }
  connectToMedialibs() {
    return this.sendConnectionRequestTo(MEDIALIBS_URL + this.action + "&token=" + this.token + "&login=" + this.login + "&password=" + this.password,
                                        'Pré-production',
                                        'MEDIALIBS');
  }

  sendConnectionRequestTo(url: string, plateformeName: string, plateformeCode: string) {
    let self = this;

    return new Promise ((resolve) => {
      axios.get(url, {})
      .then( (response) => {
        if (!response.data) {
          return {
            ok: false,
            plateformeName: plateformeName
          }
        }
        self.parseXML(response.data)
          .then((parsedXml) => {
            if (!parsedXml) {
              console.log('WRONG CREDENTIALS');

              return resolve({
                ok: false,
                plateformeName: plateformeName
              })
            }

            this.technicienConnected = parsedXml;

            return resolve({
              ok: true,
              plateformeCode: plateformeCode,
              plateformeName: plateformeName,
              technicien: parsedXml
            })
          })
          .catch(err => {
            return resolve({
              ok: false,
              plateformeName: plateformeName
            })
          })
      }).catch(err => {
        return resolve({
          ok: false,
          plateformeName: plateformeName
        })
      })
    })
  }
  parseXML(data) {
    return new Promise((resolve, reject) => {
      let parser = new xml2js.Parser({
        trim: true,
        explicitArray: true
      });

      parser.parseString(data, function (err, result) {

        if(err) return reject(err);

        if (result.connexion.erreur) {
          return resolve(false);
        }

        let technicien = result.connexion.technicien[0];

        let user              = new Technicien();
        user.id               = technicien.id[0];
        user.nom              = technicien.nom[0];
        user.prenom           = technicien.prenom[0];
        user.surnom           = technicien.surnom[0];
        user.ville            = technicien.ville[0];
        user.adresse          = technicien.adresse[0];
        user.email            = technicien.email[0];
        user.telephone        = technicien.telephone[0];
        user.portable         = technicien.portable[0];
        user.photoHttp        = technicien.photo_http[0];
        user.signatureImgHttp = technicien.signature_img_http[0];
        user.certification    = '';

        resolve(user);
      });
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
}
